const Database = require('better-sqlite3');

// Creates or opens 'tasks.db' in the project directory
const db = new Database('tasks.db');

// Enable write-ahead logging (WAL) for better performance
db.pragma('journal_mode = WAL');

// 1. Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// 2. Seed 3 example tasks only if the table is empty
const countResult = db.prepare('SELECT COUNT(*) AS count FROM tasks').get();

if (countResult.count === 0) {
  const insertStmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  
  const seedTransaction = db.transaction((seedTasks) => {
    for (const task of seedTasks) {
      insertStmt.run(task.title, task.done ? 1 : 0);
    }
  });

  seedTransaction([
    { title: 'Learn Node.js', done: false },
    { title: 'Build a CRUD API', done: false },
    { title: 'Connect to SQLite', done: false }
  ]);

  console.log('Database seeded with 3 example tasks.');
}

module.exports = db;
