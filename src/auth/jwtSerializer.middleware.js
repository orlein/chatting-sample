const jwt = require("jsonwebtoken");
const jwtConstants = require("../constants/jwtConstants");
const common = require("../constants/common");

async function jwtSerializerMiddleware(req, res, next) {
  const { nickname } = req.user;

  const token = jwt.sign({ nickname }, jwtConstants.jwtKey, {
    expiresIn: jwtConstants.expiresIn,
  });

  res.cookie("accessToken", token, {
    signed: true,
    expires: jwtConstants.expires(),
    secret: common.cookieSecret,
  });

  next();
}

module.exports = jwtSerializerMiddleware;
