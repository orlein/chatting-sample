const sqlite3 = require("sqlite3");
const { createDatabase, createTables } = require("./createDatabase");

function connectDatabase() {
  console.log("connectDatabase");
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      "database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err && err.code === "SQLITE_CANTOPEN") {
          console.log("creating database");
          createDatabase();
          return;
        }

        if (err) {
          console.log(err);
          reject(err);
          process.exit(1);
        }
      }
    );
    createTables(db);

    resolve();
  });
}

module.exports = connectDatabase;
