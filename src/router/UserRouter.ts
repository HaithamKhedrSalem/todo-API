import { Request, Response, Router } from 'express';
//import User from '../models/User';

class UserRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    res.status(200).json({});
    // User.find()
    // .then((data) => {
    //   res.status(200).json({ data });
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // });
  
  }

  public one(req: Request, res: Response): void {
    const username: string = req.params.username;
    res.status(200).json({});
    // User.findOne({ username })
    // .then((data) => {
    //   res.status(200).json({ data });
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // });
  }

  public create(req: Request, res: Response): void {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    res.status(201).json({});
    // const user = new User({
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password
    // });

    // user.save()
    // .then((data) => {
    //   res.status(201).json({ data });
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // });

  }

  public update(req: Request, res: Response): void {
    const username: string = req.params.username;
    res.status(200).json({});
    // User.findOneAndUpdate({ username }, req.body)
    // .then((data) => {
    //   res.status(200).json({ data });
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // });

  }

  public delete(req: Request, res: Response): void {
    const username: string = req.params.username;
    res.status(204).end();
    // User.findOneAndRemove({ username })
    // .then(() => {
    //   res.status(204).end();
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // });

  }

  // set up our routes
  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:username', this.one);
    this.router.post('/', this.create);
    this.router.put('/:username', this.update);
    this.router.delete('/:username', this.delete);
  }

}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;