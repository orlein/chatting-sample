const bcrypt = require("bcryptjs");
const useDatabase = require("../database/useDatabase");

const authenticationRepository = {
  getUserWithCredentials: async ({ nickname, encryptedPassword }) => {
    const result = await useDatabase(`SELECT * FROM users WHERE nickname = ?`, [
      nickname,
    ]);

    if (result.length === 0) {
      return {
        type: "SELECT",
        user: null,
        message: "User not found",
        result: false,
      };
    }

    const user = result[0];

    const isPasswordMatched = await bcrypt.compare(
      encryptedPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return {
        type: "SELECT",
        user: null,
        message: "Password is not matched",
        result: false,
      };
    }

    return {
      type: "SELECT",
      user: user,
      message: "Successfully found user",
      result: true,
    };
  },
  getUserByNickname: async (nickname) => {
    const result = await useDatabase(`SELECT * FROM users WHERE nickname = ?`, [
      nickname,
    ]);

    return result;
  },
  getRoleByName: async (name) => {
    const result = await useDatabase(`SELECT * FROM roles WHERE name = ?`, [
      name,
    ]);

    return result;
  },
  getUserRoleByName: async (userId, roleName) => {
    const userRoles = await useDatabase(
      `SELECT * FROM userRoles WHERE user_id = ? AND role_id = (SELECT id FROM roles WHERE name = ?)`,
      [userId, roleName]
    );

    return userRoles;
  },

  addUser: async ({ nickname, password }) => {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const addUserResult = await useDatabase(
      `INSERT into users (nickname, password) values (?, ?)`,
      [nickname, encryptedPassword]
    );

    return {
      type: "INSERT",
      message: "User added successfully",
      result: true,
      queryResult: addUserResult,
    };
  },
};

module.exports = authenticationRepository;
