const jwtConstants = {
  jwtKey: "SAMPLE_KEY",
  expiresIn: "15 days",
  expires: () => {
    const days = parseInt(jwtConstants.expiresIn.split(" ")[0]);
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
  },
};

module.exports = jwtConstants;
