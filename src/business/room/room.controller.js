const express = require("express");
const jwtDeserializerMiddleware = require("../../auth/jwtDeserializer.middleware");
const roomService = require("./room.service");

const router = express.Router();

router.get("/api/v1/room", jwtDeserializerMiddleware, async (req, res) => {
  const rooms = await roomService.getAllRooms();
  res.send(rooms);
});

router.post("/api/v1/room", jwtDeserializerMiddleware, async (req, res) => {
  const room = await roomService.addRoomByUser(req.user.nickname);
  res.send(room);
});

router.post(
  "/api/v1/room/:id/join",
  jwtDeserializerMiddleware,
  async (req, res) => {
    const room = await roomService.joinRoom(req.params.id, req.user.nickname);
    res.send(room);
  }
);

router.get(
  "/api/v1/room/:id/message",
  jwtDeserializerMiddleware,
  async (req, res) => {
    const messages = await roomService.getMessages(req.params.id);
    res.send(messages);
  }
);

router.post(
  "/api/v1/room/:id/message",
  jwtDeserializerMiddleware,
  async (req, res) => {
    const message = await roomService.addMessage(
      req.params.id,
      req.user.nickname,
      req.body.message
    );
    res.send(message);
  }
);

router.get("/api/v1/room/:id", (req, res) => {
  res.send("hi");
});

module.exports = router;
