const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "fullstackdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend API" });
});

// CREATE user
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "User added" });
    }
  );
});

// READ users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "User updated" });
    }
  );
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "User deleted" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});