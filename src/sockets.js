const roomSocket = require("./business/room/room.socket");

const sockets = {
  onConnection: (io) => (socket) => {
    roomSocket(io, socket);
  },
};

module.exports = sockets;
