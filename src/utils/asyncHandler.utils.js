function asyncHandler(cb) {
  return async function (req, res, next) {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default asyncHandler;
