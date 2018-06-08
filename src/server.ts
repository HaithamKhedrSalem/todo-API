import "reflect-metadata";
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as path from 'path';
import {createConnection} from "typeorm";
import expressValidator = require('express-validator')

import { User } from "./models/User";
import Auth from './authController/auth';
import AuthRouter from './router/AuthRouter';
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';


class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  private JWTMiddleware = (request, response, next): any => {
    if (request.path.includes("login")) return next();
    return Auth.authenticate((err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        if (info.name === "TokenExpiredError") {
          return response.status(401).json(
            { message: "Your token has expired. Please generate a new one" });
        }
        else {
          return response.status(401).json({ message: info.message });
        }
      }
      this.app.set("user", user);
      return next();
    })
    (request, response, next);
    }
  // application config
  public config(): void {

    createConnection().then(async connection => {
      console.log("Database is connected now.");
    }).catch(error => console.log(error));


    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(Auth.initialize());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

    this.app.use((req, res, next) => {
      this.JWTMiddleware(req, res, next);
    });    
    
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    this.app.use(expressValidator())
    this.app.use('/', router);
    this.app.use('/api/v1/posts', PostRouter);
    this.app.use('/api/v1/users', UserRouter);
    this.app.use('/api/v1/auth', AuthRouter);
  }
}

// export
export default new Server().app;