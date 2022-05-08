const roomService = require("./room.service");

const roomSocket = (io, socket) => {
  socket.on("/socket/v1/room", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    if (data.type === "ROOM_REMOVED") {
      roomService.removeMessagesFromRoom(roomId);
    }
    if (data.type === "ROOM_CREATED") {
      io.socketsJoin("roomList");
    }
    io.in("roomList").emit("/socket/v1/room", stringifiedData);
  });
  socket.on("/socket/v1/room/join", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId } = data;
    roomService.joinRoom(roomId, userId).then(() => {
      socket.join(roomId);
      io.in(roomId).emit("/socket/v1/room/join", stringifiedData);
    });
  });
  socket.on("/socket/v1/room/quit", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId } = data;
    roomService
      .quitRoom(roomId, userId)

      .then(() => {
        socket.leave(roomId);
        io.in(roomId).emit("/socket/v1/room/quit", stringifiedData);
      });
  });
  socket.on("/socket/v1/room/chat", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId, nickname, message } = data;

    roomService.addMessage(roomId, userId, message).then((result) => {
      io.in(roomId).emit(
        "/socket/v1/room/chat",
        JSON.stringify({ ...result, nickname })
      );
    });
  });
};

module.exports = roomSocket;
