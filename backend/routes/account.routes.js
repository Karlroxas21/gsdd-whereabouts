const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 12;
const User = require("../model/account.model");

const app = express();

const generateSecretKey = () => {
  const byteLength = 32;
  const buffer = crypto.randomBytes(byteLength);

  return buffer.toString("hex");
};

const secretKey = generateSecretKey();

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, position, password, role } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !position ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Account verification
    const confirmationToken = crypto.randomBytes(20).toString("hex");

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

    // JWT Token
    const token = jwt.sign({ userId: findUser.Id }, secretKey);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    res.json({
      Id: findUser.Id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      position: findUser.position,
      email: findUser.email,
      role: findUser.role,
      verified: findUser.verified,
      token: token,
    });
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

app.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
    }

    const user = await User.findOne({ where: { Id: claims.userId } });

    const { password, createdAt, updatedAt, ...data } = await user.toJSON();
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: "Unauthenticated" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("jwt", { maxAge: 0 });

  res.send({
    message: "Logout Success",
  });
});

module.exports = app;
