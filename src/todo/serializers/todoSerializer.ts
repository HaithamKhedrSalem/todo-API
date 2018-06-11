import { Todo } from "../models/todo";
import { UserSerializer } from "../../user/serializers/userSerializer";


export class TodoSerializer{

  public static serialize(todo){
    if(todo instanceof Array){
      for (let todoObject of todo) {
        delete todoObject.user;
      }
    }
    else{
      delete todo.user;
    }
    return todo;
  }
}

export default new UserSerializer();
