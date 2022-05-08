const jwt = require("jsonwebtoken");
const jwtConstants = require("../constants/jwtConstants");
const common = require("../constants/common");

async function jwtSerializerMiddleware(req, res, next) {
  const { password, ...user } = req.user;

  /** jwt */
  const token = jwt.sign(user, jwtConstants.jwtKey, {
    expiresIn: jwtConstants.expiresIn,
  });

  res.cookie("accessToken", token, {
    signed: true,
    secret: common.cookieSecret,
    expires: jwtConstants.expires(),
  });

  next();
}

module.exports = jwtSerializerMiddleware;
