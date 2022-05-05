const express = require("express");
const router = express.Router();

router.post("/authentication/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await useDatabase(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, rows) => {}
  );
  if (users.length > 0) {
    res.send(users[0]);
  } else {
    res.send({});
  }
});

module.exports = router;
