const roomService = require("./room.service");

const roomSocket = (io, socket) => {
  socket.on("/socket/v1/room", (stringifiedData) => {
    io.socketsJoin("roomList");
    io.in("roomList").emit("/socket/v1/room", stringifiedData);
  });
  socket.on("/socket/v1/room/join", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId } = data;
    roomService.joinRoom(roomId, userId);
    socket.join(roomId);
    io.in(roomId).emit("/socket/v1/room/join", stringifiedData);
  });
  socket.on("/socket/v1/room/quit", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId } = data;
    roomService.quitRoom(roomId, userId);
    socket.leave(roomId);
    io.in(roomId).emit("/socket/v1/room/quit", stringifiedData);
  });
  socket.on("/socket/v1/room/chat", (stringifiedData) => {
    const data = JSON.parse(stringifiedData);
    const { roomId, userId, message } = data;

    roomService.addMessage(roomId, userId, message);

    io.in(roomId).emit("/socket/v1/room/chat", stringifiedData);
  });
};

module.exports = roomSocket;
