export class SuccessResponse {

  public static create (data, statusCode=200) {
    return {"status_code": statusCode, "data": data};
  }
}

export default new SuccessResponse();
