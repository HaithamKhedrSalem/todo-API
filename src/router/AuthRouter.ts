import { Request, Response, Router } from 'express';
import Auth from '../authController/auth';

export class AuthRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // Signup new user
  public signup(req: Request, res: Response): void {
    res.status(200).json({'status': 'siggggggn'});
  }

  // Login user
  public login(req: Request, res: Response): void {
    Auth.login(req, res);
  }

  public routes() {
    this.router.post('/signup', this.signup);
    this.router.post('/login', this.login);
  }

}

const authRoutes = new AuthRouter();
authRoutes.routes();

export default authRoutes.router;
