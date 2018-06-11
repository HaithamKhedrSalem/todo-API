import { Validation } from "../../common/validation/validation";
import { TodoError } from '../errors/todoError';


export class CreateToDoValidation extends Validation {

  public static dataValidation(data){
    if(!('subject' in data)){
      throw new TodoError("subject is required field");
    }
  }
}

export default new CreateToDoValidation();
