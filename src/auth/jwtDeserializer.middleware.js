const jwt = require("jsonwebtoken");
const jwtConstants = require("../constants/jwtConstants");

async function jwtDeserializerMiddleware(req, res, next) {
  const accessToken = req.signedCookies.accessToken;

  if (!accessToken) {
    return res.status(401).send({
      result: false,
      message: "Access token is not provided",
      data: [],
    });
  }

  const decoded = jwt.verify(accessToken, jwtConstants.jwtKey);

  const isExpired = decoded.exp < Date.now() / 1000;

  if (isExpired) {
    return res.status(401).send({
      result: false,
      message: "Access token is expired",
      data: [],
    });
  }

  req.user = {
    nickname: decoded.nickname,
  };

  next();
}

module.exports = jwtDeserializerMiddleware;
