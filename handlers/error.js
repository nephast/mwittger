const genericErrorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: {
      message: err.message || 'Oops, something went wrong'
    }
  });
};

const notFoundErrorHandler = (req, res, next) => {
  let err = new Error('Resource not found');
  err.status = 404;
  return next(err)
};

module.exports = {
  genericErrorHandler,
  notFoundErrorHandler
};
