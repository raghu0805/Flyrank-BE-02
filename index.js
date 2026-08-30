const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Helper: Convert SQLite integer (0 or 1) to JSON boolean (false or true)
function formatTask(task) {
  if (!task) return null;
  return {
    ...task,
    done: Boolean(task.done)
  };
}

// GET /tasks - Return all tasks
app.get('/tasks', (req, res) => {
  const rows = db.prepare('SELECT * FROM tasks').all();
  const tasks = rows.map(formatTask);
  res.status(200).json(tasks);
});

// GET /tasks/:id - Return a single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);

  if (!row) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(formatTask(row));
});
