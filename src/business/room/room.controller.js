const express = require("express");
const jwtDeserializerMiddleware = require("../../auth/jwtDeserializer.middleware");

const router = express.Router();

router.get("/api/v1/rooms", jwtDeserializerMiddleware, (req, res) => {
  res.send("room");
});

router.get("/api/v1/room/hi", (req, res) => {
  res.send("hi");
});

module.exports = router;
