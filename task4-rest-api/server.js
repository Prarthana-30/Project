const express = require("express");
const app = express();
const port = 3000;

// ⭐ THIS LINE IS MANDATORY
app.use(express.json());

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  res.status(201).json({
    message: "User created successfully",
    user: { name, email, age }
  });
});
app.get("/users",(req,res)=>{
    res.json({
        message:"Get users route working"
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});