class APIResponse {
  constructor(status = 200, message = "Ok", data = {}) {
    this.success = true;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default APIResponse;
