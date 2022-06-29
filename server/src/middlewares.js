/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  /* 200 means somother route made error and we caught it here,
    hence we will set it to generic error code(500). */

  res.status(statusCode); /* to set the status code */
  /* response with json about info on error */
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? ""
        : error.stack /* not to be done on production.(just for debugging) */,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
