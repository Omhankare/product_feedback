const express = require("express");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 8080;

const con = new Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "feedback",
  password: process.env.DB_PASSWORD,
});

con
  .connect()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

//login page post
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await con.query(
      "SELECT * FROM users WHERE username = $1 and password =  $2",
      [username, password],
    );
    if (result.rows.length > 0) {
      res.send("Login Successful");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error Can't login");
  }
});

//register page post
app.post("/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).send("Password dont match");
    }
    const check = await con.query(
      "SELECT * from users WHERE username= $1 OR email= $2",
      [username, email],
    );
    if (check.rows.length > 0) {
      return res.status(400).send("User already exist");
    }

    const result = await con.query(
      "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password],
    );
    res.send("Signup successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Signup Error");
  }
});
//feedback page get
app.get("/feedback", async (req, res) => {
  try {
    const result = await con.query("SELECT * FROM feedback");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Backend error");
  }
});
//feedback page post
app.post("/feedback", async (req, res) => {
  const { user_id, message } = req.body;
  try {
    const result = await con.query(
      "INSERT INTO feedback(user_id,message) VALUES ($1, $2) RETURNING * ",
      [user_id, message],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Feedback dont add ");
  }
});

//feedback page patch
app.patch("/feedback/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const result = await con.query(
      "UPDATE feedback SET message = $1 WHERE id = $2 RETURNING * ",
      [message, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Cant edit feedback");
  }
});

//feedback delete
app.delete("/feedback/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await con.query(
      "DELETE from feedback where id = $1 RETURNING *",
      [id],
    );
    res.send("feedback deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Feedback not deleted");
  }
});

//admin dashboard
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
