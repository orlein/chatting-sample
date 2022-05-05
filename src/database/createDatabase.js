const sqlite3 = require("sqlite3");

/**
 *
 * @param {sqlite3.Databse} newdb
 */
async function createTables(newdb) {
  return new Promise((resolve, reject) => {
    newdb.exec(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS userRoles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        role_id INTEGER,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER,
        user_id INTEGER,
        message TEXT,
        created_at TEXT,
        updated_at TEXT
      );
      
      CREATE TABLE IF NOT EXISTS room_users (
        room_id INTEGER,
        user_id INTEGER
      );

    `,
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      }
    );
    resolve();
  });
}

async function createDatabase() {
  const newdb = new sqlite3.Database("database.db", (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
  createTables(newdb);
}

module.exports = { createDatabase, createTables };
