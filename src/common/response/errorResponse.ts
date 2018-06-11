export class ErrorResponse {

  public static create (errMsg, statusCode=400) {
    return {
        "err_msg": errMsg, "status_code": statusCode};
  }
}

export default new ErrorResponse();
