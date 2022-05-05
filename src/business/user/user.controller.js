const express = require("express");
const useDatabase = require("../../database/useDatabase");
const router = express.Router();

router.get("/user", async (req, res) => {
  const users = await useDatabase(`SELECT * FROM users`, [], (err, rows) => {});
  res.send(users);
});

router.get("/user/add", async (req, res) => {
  const users = await useDatabase(
    `INSERT into users (name, email, password) values ('name1', 'email1@email.com', 'p@ssw0rd')`,
    [],
    (err, rows) => {}
  );

  res.send("add user");
});

module.exports = router;
