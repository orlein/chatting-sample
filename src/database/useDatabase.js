const sqlite3 = require("sqlite3");
const transformObjectKeyFromSnakeToCamel = require("../util/transformObjectKeyFromSnakeToCamel");

/**
 *
 * @param {string} query
 * @param {string[]} params
 */
async function useDatabase(query, params) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      "database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    db.all(query, params, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      const transformed = transformObjectKeyFromSnakeToCamel(result);
      resolve(transformed);
    });
  });
}

module.exports = useDatabase;
