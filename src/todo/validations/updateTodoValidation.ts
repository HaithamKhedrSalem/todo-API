import { TodoValidation } from "./todoValidation";
import { TodoError } from '../errors/todoError';


export class UpdateTodoValidation extends TodoValidation {

  public dataValidation(data){
    if(!('subject' in data)){
      throw new TodoError("subject is required field");
    }
    if (data.subject === "") {
      throw new TodoError("Subject can not be empty");
    }
    if(!('comment' in data)){
      throw new TodoError("comment is required field");
    }
    if(!('datetime' in data)){
      throw new TodoError("datetime is required field");
    }
    if(!this.isValidDatetime(data.datetime)){
      throw new TodoError("Invalid datetime value.");
    }
  }
}

export default new UpdateTodoValidation();
