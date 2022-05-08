const useDatabase = require("../../database/useDatabase");

const userRepository = {
  getByUserId: async (userId) => {
    const user = await useDatabase(`SELECT * FROM users WHERE id = ?`, [
      userId,
    ]);
    return user[0];
  },
};
