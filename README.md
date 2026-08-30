# W3 · A1 — Connecting CRUD to SQLite Database

A lightweight, persistent Task Management CRUD API built with Node.js, Express, and SQLite using `better-sqlite3`.

---

## 💡 Why SQLite Was Chosen

SQLite was selected for this project because:
- **Serverless & Zero-Configuration**: Unlike PostgreSQL or MySQL, SQLite requires no external database server or installation.
- **Single File Storage**: All tables and data are stored in a simple, portable file (`tasks.db`).
- **Data Persistence**: Data survives server restarts, replacing temporary in-memory JavaScript array storage.

---

## 📁 Database File Location

The database file is created and stored in the root directory:
```
tasks.db
```
When the application starts for the first time, it automatically creates the `tasks` table and populates 3 example seed tasks if empty.

---

## 🚀 How to Start the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   node index.js
   ```
   The server runs at: `http://localhost:3000`

---

## 🔍 Database Viewer & Exploration

You can view and inspect the `tasks.db` file using any SQLite viewer tool such as **DB Browser for SQLite** or the VS Code **Database Client / SQLite Extension**.

### Database Schema

| Column Name | Data Type | Key / Constraints | Description |
|---|---|---|---|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each task |
| `title` | `TEXT` | `NOT NULL` | The title of the task |
| `done` | `INTEGER` | `NOT NULL DEFAULT 0` | Task completion status (`0` = false, `1` = true) |

---

## 📊 Example Executed SQL Queries

Here are example SQL queries executed directly against the database:

### 1. List all tasks
```sql
SELECT * FROM tasks;
```

### 2. Filter completed tasks
```sql
SELECT * FROM tasks WHERE done = 1;
```

### 3. Count total tasks
```sql
SELECT COUNT(*) FROM tasks;
```

### 4. Mark all tasks as completed
```sql
UPDATE tasks SET done = 1;
```

### 5. Delete completed tasks
```sql
DELETE FROM tasks WHERE done = 1;
```
