import { Request, Response, Router } from 'express';
import {getConnection} from "typeorm";

import { CreateTodoValidation } from '../validations/createTodoValidation';
import { UpdateTodoValidation } from '../validations/updateTodoValidation';
import { Todo } from '../models/todo';
import { SuccessResponse } from "../../common/response/successResponse";
import { ErrorResponse } from "../../common/response/errorResponse";
import { TodoSerializer } from '../serializers/todoSerializer';
import { TodoError } from '../errors/todoError';


export class ToDoRouter {

  public router: Router;
  public createTodoValidation: CreateTodoValidation;
  public updateTodoValidation: UpdateTodoValidation;

  constructor() {
    this.router = Router();
    this.createTodoValidation = new CreateTodoValidation();
    this.updateTodoValidation = new UpdateTodoValidation();
    this.routes();
  }


  public create = async(req: Request, res: Response) => {
    try{
      let body = req.body;
      let userObject = req.app.get('user');
      this.createTodoValidation.dataValidation(body);
      let todoObject = await getConnection().manager.create(
          Todo,{user: userObject, subject: body.subject,
                datetime: body.datetime, comment: body.comment});
      todoObject = await getConnection().manager.save(todoObject);
      let response = SuccessResponse.create(
        {'todo': TodoSerializer.serialize(todoObject)});
      res.status(201).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  public all = async(req: Request, res: Response) => {
    let userObject = req.app.get('user');
    let todos = await getConnection().manager.find(
      Todo, { user: userObject});
    let response = SuccessResponse.create(
        {'todo': TodoSerializer.serialize(todos)});
    res.status(200).json(response);
  }

  public one = async(req: Request, res: Response) => {
    try{
      let userObject = req.app.get('user');
      const todoID: string = req.params.todoID;
      let todoObject = await getConnection().manager.findOne(
        Todo, {where: { user: userObject, id: todoID}});
      if(typeof todoObject === 'undefined'){
        throw new TodoError("Todo with id (" + todoID + ") not found");
      }
      let response = SuccessResponse.create(
          {'todo': TodoSerializer.serialize(todoObject)});
      res.status(200).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  public delete = async(req: Request, res: Response) => {
    try{
      let userObject = req.app.get('user');
      const todoID: string = req.params.todoID;
      let todoObject = await getConnection().manager.findOne(
        Todo, {where: { user: userObject, id: todoID}});
      if(typeof todoObject === 'undefined'){
        throw new TodoError("Todo with id (" + todoID + ") not found");
      }
      await getConnection().manager.remove(todoObject);
      res.status(204).json();
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }

  public update = async(req: Request, res: Response) => {
    try{
      const todoID: string = req.params.todoID;
      let body = req.body;
      let userObject = req.app.get('user');
      this.updateTodoValidation.dataValidation(body);
      let todoObject = await getConnection().manager.findOne(
        Todo, {where: { user: userObject, id: todoID}});
      if(typeof todoObject === 'undefined'){
        throw new TodoError("Todo with id (" + todoID + ") not found");
      }
      todoObject.subject = body.subject;
      todoObject.comment = body.comment;
      todoObject.datetime = body.datetime;
      await getConnection().manager.save(todoObject);
      let response = SuccessResponse.create(
          {'todo': TodoSerializer.serialize(todoObject)});
      res.status(200).json(response);
    }
    catch(err){
      let response = ErrorResponse.create(err.message, 400)
      res.status(400).json(response);
    }
  }


  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:todoID', this.one);
    this.router.post('/', this.create);
    this.router.put('/:todoID', this.update);
    this.router.delete('/:todoID', this.delete);
  }

}

const todotRoutes = new ToDoRouter();
todotRoutes.routes();

export default todotRoutes.router;
