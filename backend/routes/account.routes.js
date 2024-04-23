const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const User = require("../model/account.model");

const app = express();

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, position, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      position: position,
      password: hashedPassword,
      role: role,
    });

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({ message: "Login failed. User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Login failed. Incorrect password." });
    }

    res.json({ message: "Login successful", findUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/users", async (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = app;
