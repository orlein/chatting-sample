const express = require("express");
const router = express.Router();

const authenticationController = require("./auth/authentication.controller");
const roomController = require("./business/room/room.controller");
const userController = require("./business/user/user.controller");

router.get("/", (req, res) => {
  res.status(200).send("hello world");
});

router.use(authenticationController);
router.use(roomController);
router.use(userController);

module.exports = router;
