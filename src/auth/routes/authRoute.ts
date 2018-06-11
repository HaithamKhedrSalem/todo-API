import { Request, Response, Router } from 'express';
import {getConnection} from "typeorm";

import Auth from '../controllers/authControllers';
import { User } from "../../user/models/user";
import { UserSerializer } from "../../user/serializers/userSerializer";
import { SignupValidation } from "../validations/signupValidation";
import { LoginValidation } from "../validations/loginValidation";
import { LoginError } from '../errors/loginError';
import { ErrorResponse } from "../../common/response/errorResponse";
import { SuccessResponse } from "../../common/response/successResponse";

export class AuthRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public signup = async(req: Request, res: Response) => {
    try{
      let body = req.body;
      SignupValidation.dataValidation(body);
      let userObject = await getConnection().manager.create(
        User,{username: body.username, email: body.email,
              password: body.password});
      userObject = await getConnection().manager.save(userObject);
      let token = Auth.genToken(userObject);
      let response = SuccessResponse.create(
       {'user': UserSerializer.serialize(userObject), 'token': token});
      res.status(201).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  public login = async(req: Request, res: Response) => {
    try{
      let body = req.body;
      LoginValidation.dataValidation(body);
      let userObject = await getConnection().manager.findOne(
        User, {username: body.username});
      if (typeof userObject === "undefined"){
          throw new LoginError("User not found.")
      }
      let success = Auth.comparePassword(userObject.password, body.password);
      if (success === false){
          throw new LoginError("Invalid username or password.");
      }
      let token = Auth.genToken(userObject);
      let response = SuccessResponse.create(
        {'user': UserSerializer.serialize(userObject), 'token': token});
      res.status(200).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  public routes() {
    this.router.post('/signup', this.signup);
    this.router.post('/login', this.login);
  }

}

const authRoutes = new AuthRouter();
authRoutes.routes();

export default authRoutes.router;
