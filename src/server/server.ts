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

import { User } from "../user/models/user";
import Auth from '../auth/controllers/authControllers';
import AuthRouter from '../auth/routes/authRoute';
import ToDoRouter from '../todo/routes/todoRoute';
import UserRouter from '../user/routes/userRoute';
import JWTAuthMiddleware from './middlewares/JWTMiddleware';


class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
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
    
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    this.app.use(expressValidator())
    this.app.use('/', router);
    this.app.use('/api/v1/todos', JWTAuthMiddleware.auth,  ToDoRouter);
    this.app.use('/api/v1/users', JWTAuthMiddleware.auth, UserRouter);
    this.app.use('/api/v1/auth', AuthRouter);
  }
}

// export
export default new Server().app;
