const { BadRequest } = require("../core/error.response");

const NotFound = (req, res, next) => {
  const error = new BadRequest("Page Not Found");
  error.status = 404;
  next(error);
};

module.exports = NotFound;
