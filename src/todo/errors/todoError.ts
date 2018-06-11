import { BaseError } from "../../common/error/error";


export class TodoError extends BaseError{
  constructor (message) {
    // Providing default message and overriding status code.
    super(message, 400);
  }
}
