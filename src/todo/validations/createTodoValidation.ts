import { TodoValidation } from "./todoValidation";
import { TodoError } from '../errors/todoError';


export class CreateTodoValidation extends TodoValidation {

  public dataValidation(data){
    if(!('subject' in data)){
      throw new TodoError("subject is required field");
    }
    if (data.subject === "") {
      throw new TodoError("Subject can not be empty");
    }
    if('datetime' in data && data.datetime !== ""){
      if(!this.isValidDatetime(data.datetime)){
        throw new TodoError("Invalid datetime value.");
      }
    }
  }
}

export default new CreateTodoValidation();
