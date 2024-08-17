const { Forbidden } = require("../core/error.response");
const verifyToken = require("./verify.token.middleware");

function authorize(roles = null) {
  return [
    verifyToken,
    (req, res, next) => {
      if (roles === null) return next();

      console.log("req.user.role: authorize", req.user.role);
      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }

      throw new Forbidden("You don't have permission to access this route");
    },
  ];
}

module.exports = authorize;
