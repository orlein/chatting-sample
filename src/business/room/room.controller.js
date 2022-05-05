const express = require("express");

const router = express.Router();

router.get("/room", (req, res) => {
  res.send("room");
});

router.get("/room/hi", (req, res) => {
  res.send("hi");
});

module.exports = router;
