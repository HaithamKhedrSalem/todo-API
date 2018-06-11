import { Request, Response, Router } from 'express';


export class ToDoRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the todos in the database
  public all(req: Request, res: Response): void {
    res.status(200).json({'status': 'succccceeeeeesssssss'});
  }

  // get a single todo by params of 'slug'
  public one(req: Request, res: Response): void {
    const slug: string = req.params.slug;
    res.status(200).json({});
  }

  // create a new todo
  public create(req: Request, res: Response): void {
    res.status(200).json({});
  }

  // update todo by params of 'slug'
  public update(req: Request, res: Response): void {
    const slug: string = req.body.slug;
    res.status(200).json({});
  }

  // delete todo by params of 'slug'
  public delete(req: Request, res: Response): void {
    const slug: string = req.body.slug;
    res.status(204).end();
  }

  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:slug', this.one);
    this.router.post('/', this.create);
    this.router.put('/:slug', this.update);
    this.router.delete('/:slug', this.delete);
  }

}

const todotRoutes = new ToDoRouter();
todotRoutes.routes();

export default todotRoutes.router;
