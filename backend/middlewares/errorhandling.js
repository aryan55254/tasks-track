const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "An unexpected error occurred on the server.",
    error: "Internal Server Error",
  });
};

module.exports = errorHandler;
