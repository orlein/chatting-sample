const roomRepository = require("./room.repository");

const roomService = {
  getAllRooms: async () => {
    const rooms = await roomRepository.getAllRooms();
    return rooms;
  },
  getRoomById: async (roomId) => {
    const room = await roomRepository.getRoomById(roomId);
    return room;
  },
  addRoomByUser: async (roomName, userId) => {
    const room = await roomRepository.addRoomByUser(roomName, userId);

    return room[0];
  },
  removeRoomByUser: async (roomId, userId) => {
    const room = await roomRepository.removeRoomByUser(roomId, userId);
    return room;
  },
  joinRoom: async (roomId, userId) => {
    const room = await roomRepository.joinRoom(roomId, userId);
    return room;
  },
  getRoomUsers: async (roomId) => {
    const roomUsers = await roomRepository.getRoomUsers(roomId);
    return roomUsers;
  },
  getRoomMessages: async (roomId) => {
    const roomMessages = await roomRepository.getRoomMessages(roomId);
    return roomMessages;
  },
  addMessage: async (roomId, userId, message) => {
    const messageResult = await roomRepository.addMessage(
      roomId,
      userId,
      message
    );
    return messageResult;
  },
  quitRoom: async (roomId, userId) => {
    const room = await roomRepository.quitRoom(roomId, userId);
    return room;
  },
};

module.exports = roomService;
