class APIErrorResponse extends Error {
  constructor(status = 500, message = "Something went wrong!") {
    super(message);
    this.success = false;
    this.status = status;
    this.ErrorMessage = message;
  }
}

export default APIErrorResponse;
