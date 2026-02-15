const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

/* POST - Add a new user */
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "All fields (name, email, age) are required"
    });
  }

  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({
      message: "User added successfully",
      userId: result.insertId
    });
  });
});

/* GET - Fetch all users */
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});