const express = require("express");

const router = express.Router();

router.get("/api/v1/room", (req, res) => {
  res.send("room");
});

router.get("/api/v1/room/hi", (req, res) => {
  res.send("hi");
});

module.exports = router;
