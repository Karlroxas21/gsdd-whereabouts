const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const credential_email = require("../config").nodemail;
const base_URL = require("../config").base_url;
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
    const { first_name, last_name, email, position, pin, role } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !position ||
      !pin ||
      !role
    ) {
      return res
        .status(400)
        .json(
            {firstname: first_name, lastname: last_name, email: email, position: position, pin: pin, role: role}
        );
    }

    const hashedPassword = await bcrypt.hash(pin, saltRounds);

    // Account verification
    const confirmationToken = crypto.randomBytes(20).toString("hex");

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      position: position,
      pin: hashedPassword,
      role: role,
      email_token: confirmationToken,
    });

    sendConfirmationEmail(newUser);

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, pin } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({ message: "Login failed. User not found." });
    }

    const isPinValid = await bcrypt.compare(pin, findUser.pin);
    if (!isPinValid) {
      return res
        .status(401)
        .json({ message: "Login failed. Incorrect password." });
    }

    // JWT Token
    const token = jwt.sign({ userId: findUser.Id }, secretKey);

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 100,
    // });

    const claims = jwt.verify(token, secretKey);
    if (!claims) {
        res.status(401).json({ message: "Unauthenticated" });
        return;
    }

    res.json({
      Id: findUser.Id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      position: findUser.position,
      email: findUser.email,
      role: findUser.role,
      verified: findUser.verified,
      token: token,
      emailToken: findUser.emailToken,
      claims: claims
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

    const { pin, email_token, createdAt, updatedAt, ...data } = await user.toJSON();
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

app.get("/confirm", async (req, res) => {
  const emailToken = req.query.emailToken;

  try {
    await User.update(
      { verified: 1 },
      {
        where: {
          email_token: emailToken,
        },
      },
    );
    res.status(200).json({ message: "Account verified!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

function sendConfirmationEmail(account) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: credential_email.user,
      pass: credential_email.password,
    },
  });

  const baseURL = base_URL.url || "localhost:4200";

  const mailOptions = {
    from: credential_email.user,
    to: account.email,
    subject: `GSDD Personnel Tracking System Account Verification`,
    html: `<h1>Hi ${account.first_name}!</h1>
        <p>Please click the button to verify your account: </p>
        <a href="http://${baseURL}/account_confirmation/?emailToken=${account.email_token}" 
        style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block">
        Verify Your Account</a>
        <p>If you did not request this, please ignore this email.</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

module.exports = app;
