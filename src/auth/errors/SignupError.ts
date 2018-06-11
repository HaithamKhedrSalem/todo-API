import { BaseError } from "../../common/error/error";


export class SignupError extends BaseError{
  constructor (message) {
    // Providing default message and overriding status code.
    super(message, 400);
  }
}
