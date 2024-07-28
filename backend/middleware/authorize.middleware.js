const { Forbidden } = require("../core/error.response");
const verifyToken = require("./verify.token.middlware");

function authorize(roles = null) {
  return [
    verifyToken,
    (req, res, next) => {
      if (roles === null) return next();

      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      if (allowedRoles.includes(req.employee.role)) {
        return next();
      }

      throw new Forbidden("You don't have permission to access this route");
    },
  ];
}

module.exports = authorize