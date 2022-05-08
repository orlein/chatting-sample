const jwt = require("jsonwebtoken");
const jwtConstants = require("../constants/jwtConstants");
const authenticationService = require("./authentication.service");

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

  const infoResult = await authenticationService.info({
    nickname: decoded.nickname,
  });

  if (infoResult.data[0].password) {
    delete infoResult.data[0].password;
  }

  const user = infoResult.data[0];

  req.user = user;
  res.locals.message = "Access token is valid";

  next();
}

module.exports = jwtDeserializerMiddleware;
