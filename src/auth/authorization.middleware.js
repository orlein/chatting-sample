const authenticationRepository = require("./authentication.repository");

async function authorizationMiddleware(roleName) {
  return async function (req, res, next) {
    const user = req.user;

    const userRoles = await authenticationRepository.getUserRoleByName(
      user.id,
      roleName
    );

    if (userRoles.length === 0) {
      return res.status(403).json({
        result: false,
        message: "You are not authorized to access this resource",
        data: [],
      });
    }

    next();
  };
}

module.exports = authorizationMiddleware;
