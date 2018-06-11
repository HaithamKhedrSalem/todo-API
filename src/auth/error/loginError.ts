import { BaseError } from "../../error/error";


export class LoginError extends BaseError{
  constructor (message) {
    // Providing default message and overriding status code.
    super(message, 400);
  }
}
