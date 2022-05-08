const express = require("express");
const jwtSerializerMiddleware = require("./jwtSerializer.middleware");
const jwtDeserializerMiddleware = require("./jwtDeserializer.middleware");
const authenticationService = require("./authentication.service");
const router = express.Router();

router.post(
  "/api/v1/auth/login",
  async (req, res, next) => {
    const { nickname, password } = req.body;
    const serviceResult = await authenticationService.login({
      nickname,
      password,
    });
    if (!serviceResult.result) {
      return res.status(400).json({
        result: false,
        message: serviceResult.message,
        data: [],
      });
      // End of flow
    }

    req.user = serviceResult.data[0];
    res.locals.message = serviceResult.message;
    next();
  },
  jwtSerializerMiddleware,
  async (req, res) => {
    return res.status(200).send({
      result: true,
      message: res.locals.message,
      data: [req.user],
    });
  }
);

router.post(
  "/api/v1/auth/join",
  async (req, res, next) => {
    const { nickname } = req.body;
    const serviceResult = await authenticationService.checkDuplication({
      nickname,
    });

    if (!serviceResult.result) {
      return res.status(409).json({
        result: false,
        message: serviceResult.message,
        data: [],
      });
    }
    req.user = { nickname };
    res.locals.message = serviceResult.message;
    next();
  },
  jwtSerializerMiddleware,
  async (req, res, next) => {
    const { nickname, password } = req.body;
    const serviceResult = await authenticationService.join({
      nickname,
      password,
    });

    req.user = serviceResult.data[0];
    res.locals.message = serviceResult.message;

    next();
    res.status(200).send({
      result: true,
      message: res.locals.message,
      data: serviceResult.data,
    });
  }
);

router.get("/api/v1/auth/info", jwtDeserializerMiddleware, async (req, res) => {
  return res.status(200).send({
    result: true,
    message: res.locals.message,
    data: [req.user],
  });
});

module.exports = router;
