import APIErrorResponse from "../utils/apiError.utils.js";

function appErrorResponseHandler(err, req, res, next) {
  return res.status(500).json(new APIErrorResponse(500, `${err.message}`));
}

export default appErrorResponseHandler;
