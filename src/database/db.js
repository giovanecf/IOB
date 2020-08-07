const Database = require("sqlite-async");

module.exports = Database.open(__dirname + "/database.sqlite").then((db) => {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS worker (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      whatsapp TEXT,
      sex TEXT,
      city TEXT,
      state TEXT,
      avatar TEXT,
      bio TEXT
    );

    CREATE TABLE IF NOT EXISTS service (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profession INTERGER,
      cost TEXT,
      worker_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS service_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER,
      weekday INTEGER,
      time_from INTEGER,
      time_to INTEGER
    );
  `);
});
