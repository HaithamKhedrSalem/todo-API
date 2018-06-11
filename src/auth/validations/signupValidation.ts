import { Validation } from "../../common/validation/validation";
import { SignupError } from '../errors/SignupError';
import * as EmailValidator from 'email-validator';


export class SignupValidation extends Validation {

  public static dataValidation(data){
    if(!('email' in data)){
      throw new SignupError("Email is a required field");
    }
    if(!('username' in data)){
      throw new SignupError("username is required field");
    }
    if(!('password' in data)){
      throw new SignupError("password is required field");
    }
    if(!(EmailValidator.validate(data.email))){
      throw new SignupError("Invalid email format.");
    }
  }
}

export default new SignupValidation();
