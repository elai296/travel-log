//for error handling middleware

const notFound = (req, res, next) => { // this is a not found middleware
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => { //must have 4 parameters , this is a general error handling middleware
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler, 
};
