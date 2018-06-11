import { Request, Response, Router } from 'express';

import { UserSerializer } from "../controllers/userSerializer";
import { ErrorResponse } from "../../response/errorResponse";
import { SuccessResponse } from "../../response/successResponse";


class UserRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }


  public getUser = async(req: Request, res: Response) => {
    try{
      let userObject = req.app.get('user');
      let response = SuccessResponse.create(
       {'user': UserSerializer.serialize(userObject)});
      res.status(200).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  // set up our routes
  public routes() {
    this.router.get('/me', this.getUser);
  }

}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;