import * as moment from "moment";

import { Validation } from "../../common/validation/validation";
import { TodoError } from '../errors/todoError';


export class TodoValidation extends Validation {

  public isValidDatetime(datetime){
    let valid = moment(
      datetime, moment.ISO_8601, true).isValid();
    return valid;
  }
}

export default new TodoValidation();
