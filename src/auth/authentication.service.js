const {
  getUserWithCredentials,
  addUser,
  getUserByNickname,
} = require("./authentication.repository");

const authenticationService = {
  login: async ({ nickname, password }) => {
    const respositoryResult = await getUserWithCredentials({
      nickname,
      encryptedPassword: password,
    });

    if (!respositoryResult.result) {
      return {
        result: false,
        message: `Login failed`,
        data: [],
      };
    }

    return {
      result: true,
      message: `Login successfully`,
      data: [respositoryResult.user],
    };
  },
  checkDuplication: async ({ nickname }) => {
    const data = await getUserByNickname({
      nickname,
    });

    if (data.length > 0) {
      return {
        result: false,
        message: `Nickname is already used`,
        data: [],
      };
    }

    return {
      result: true,
      message: `Nickname is available`,
      data: [],
    };
  },
  join: async ({ nickname, password }) => {
    const respositoryResult = await addUser({
      nickname,
      password,
    });

    const newUser = await getUserByNickname(nickname);

    return {
      result: true,
      message: respositoryResult.message,
      data: [newUser],
    };
  },
  info: async ({ nickname }) => {
    const data = await getUserByNickname(nickname);

    if (!data.length === 0) {
      return {
        result: false,
        message: `User not found`,
        data: [],
      };
    }

    return {
      result: true,
      message: `Successfully found user`,
      data,
    };
  },
  authorizeUser: async ({ nickname, roleName }) => {
    const users = getUserByNickname(nickname);

    if (users.length === 0) {
      return { data: [], message: "User not found", result: false };
    }

    const user = users[0];

    const userRoles = await authenticationRepository.getUserRoleByName(
      user.id,
      roleName
    );

    if (userRoles.length === 0) {
      return { data: [], message: "User is not authorized", result: false };
    }

    return {
      data: [user[0]],
      message: `User is authorized with role ${roleName}`,
      result: true,
    };
  },
};

module.exports = authenticationService;
