const useDatabase = require("../../database/useDatabase");

const roomRepository = {
  getAllRooms: async () => {
    const rooms = await useDatabase(`SELECT * FROM rooms`, []);
    return rooms;
  },
  getRoomById: async (roomId) => {
    const room = await useDatabase(`SELECT * FROM rooms WHERE id = ?`, [
      roomId,
    ]);
    return room;
  },
  addRoomByUser: async (roomName, userId) => {
    await useDatabase(
      `INSERT into rooms (name, creator_user_id) values (?, ?)`,
      [roomName, userId]
    );

    const room = await useDatabase(
      `SELECT * FROM rooms WHERE creator_user_id = ? AND name = ?`,
      [userId, roomName]
    );

    return room;
  },
  removeRoomByUser: async (roomId, userId) => {
    await useDatabase(
      `DELETE FROM rooms WHERE id = ? AND creator_user_id = ?`,
      [roomId, userId]
    );
  },
  joinRoom: async (roomId, userId) => {
    const room = await useDatabase(
      `INSERT into roomUsers (room_id, user_id) values (?, ?)`,
      [roomId, userId]
    );
    return room;
  },
  getRoomUsers: async (roomId) => {
    const users = await useDatabase(
      `SELECT * FROM users WHERE id IN (SELECT user_id FROM roomUsers WHERE room_id = ?)`,
      [roomId]
    );
    return users.map(({ password, ...user }) => user);
  },
  getRoomMessages: async (roomId) => {
    const roomMessages = await useDatabase(
      `SELECT messages.*, users.nickname
      FROM messages
      LEFT JOIN users ON users.id = messages.user_id
      WHERE room_id = ?`,
      [roomId]
    );
    return roomMessages;
  },
  addMessage: async (roomId, userId, message) => {
    const now = new Date().getTime().toString();
    const messageResult = await useDatabase(
      `INSERT into messages (room_id, user_id, message, created_at, updated_at) values (?, ?, ?, ?, ?)`,
      [roomId, userId, message, now, now]
    );

    return {
      roomId,
      userId,
      message,
      createdAt: now,
      updatedAt: now,
    };
  },
  quitRoom: async (roomId, userId) => {
    const room = await useDatabase(
      `DELETE FROM roomUsers WHERE room_id = ? AND user_id = ?`,
      [roomId, userId]
    );
  },
  removeMessagesFromRoom: async (roomId) => {
    await useDatabase(`DELETE FROM messages WHERE room_id = ?`, [roomId]);
  },
};

module.exports = roomRepository;
