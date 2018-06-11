import { Validation } from "../../common/validation/validation";
import { LoginError } from '../errors/loginError';


export class LoginValidation extends Validation {

	public static dataValidation(data){
    if(!('username' in data)){
      throw new LoginError("username is required field");
    }
    if(!('password' in data)){
      throw new LoginError("password is required field");
    }
	}
}

export default new LoginValidation();
