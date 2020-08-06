const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const xoauth2 = require("xoauth2")
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
require("dotenv").config();
const User = require("../../models/User");
const { CustomError } = require(__dirname + "/../../helpers/errors.js");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");

// get logged in user
router.get("/", isAuthenticated, async (req, res, next) => {
  const user = await User.query()
    .select("*")
    .findById(req.session.user.id)
    .throwIfNotFound();
  res.json(user);
});

router.get("/is-authenticated", async (req, res) => {
  try {
    const loggedUser = await User.query()
      .select("username", "email", "firstName", "lastName")
      .findById(req.session.user.id);
    if (!loggedUser)
      return res.status(404).json({ status: 0, msg: "User not authorized!" });
    res
      .status(200)
      .json({ status: 1, msg: "User authorized!", user: loggedUser });
  } catch (err) {
    return res.status(404).json({ status: 0, msg: "Server error!" });
  }
});

//creating a new user - register
router.post("/register", async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    repeatPassword,
  } = req.body;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const valid = emailRegexp.test(email);

  if (
    username &&
    email &&
    password &&
    repeatPassword &&
    password === repeatPassword
  ) {
    if (!valid) {
      return res.status(400).send({ response: "Invalid email" });
    } else if (password.length < 3) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUsername = await User.query()
            .select()
            .where({ username: username })
            .limit(1);
          const existingEmail = await User.query()
            .select()
            .where({ email: email })
            .limit(1);

          if (existingUsername[0] || existingEmail[0]) {
            return res.status(404).send({ response: "User already exists" });
          } else if (!existingUsername[0] && !existingEmail[0]) {
            const newUser = await User.query().insert({
              firstName,
              lastName,
              email,
              username,
              password: hashedPassword,
            });

            return res.status(200).send({ username: newUser.username });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeatPassword) {
    return res
      .status(404)
      .send({ response: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const users = await User.query().select().where({ username }).limit(1);
    const user = users[0];

    if (!user) {
      return res
        .status(404)
        .send({ response: "Invalid user/password combination" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({ response: "Comparing error" });
      }
      if (!isSame) {
        return res
          .status(404)
          .send({ response: "Invalid user/password combination" });
      } else {
        req.session.user = {
          username: user.username,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        return res.status(200).json({
          status: 1,
          message: "User logged in",
          email: user.email,
          userId: user.id,
        });
      }
    });
  } else {
    return res.status(404).send({ response: "Missing username or password" });
  }
});

router.post("/logout", isAuthenticated, (req, res, next) => {
  req.session.destroy((err) => {
    if (err)
      return res.json({
        status: 0,
        message: "Error while trying to logout user!",
      });
    res.clearCookie("user_sid");
    res.status(200).json({ status: 1, msg: "User has logged out!" });
  });
});

router.delete("/", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.query().deleteById(req.session.user.id);
    if (user) {
      res.json({
        message: `User ${req.session.username} successfully deleted`,
      });
    } else {
      res.json({
        message: `Error deleting the user`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/", isAuthenticated, async (req, res, next) => {
  const { id, firstName, lastName } = req.body;
  try {
    const user = await User.query().findById(id).throwIfNotFound();
    await user.$query().patch({ firstName, lastName });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/changePassword/", async (req, res) => {
  const { username, password, repeatPassword, token } = req.body;

  if (!token) {
    return res.redirect("http://localhost:3000/login");
  }

  const users = await User.query().select().where({ username }).limit(1);
  const user = users[0];
  const usersToken = await User.query()
    .select()
    .where({ resetPasswordToken: token })
    .limit(1);
  const userToken = usersToken[0];

  if (!userToken) {
    console.error("password reset link is invalid or has expired");
    return res
      .status(403)
      .send("password reset link is invalid or has expired")
      .redirect("http://localhost:3000/login");
  }
  if (userToken.resetPasswordExpires === null) {
    return res.redirect("http://localhost:3000/login");
  }

  const timeNow = moment().unix();
  const userTimeLimit = moment(userToken.resetPasswordExpires).unix();
  const difference = parseInt(userTimeLimit) - parseInt(timeNow);

  if (difference <= 0) {
    return res.redirect("http://localhost:3000/login");
  } else if (password && repeatPassword && password === repeatPassword) {
    bcrypt.hash(
      req.body.password,
      saltRounds,
      async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          if (!user) {
            return res.status(404).send({ response: "User does not exist" });
          } else {
            await User.query()
              .patch({ password: hashedPassword })
              .findById(user.id);
            return res
              .status(200)
              .send({ username: user.username, response: "password changed" });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      }
    );
  }
});

// send email and create token and expire time
router.post("/forgottenPassword", async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);
  if (req.body.email) {
    const users = await User.query()
      .select()
      .where({ email: req.body.email })
      .limit(1);
    const user = users[0];
    if (user === null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      await User.query()
        .findById(user.id)
        .patch({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "",
          clientId: "",
          clientSecret: "",
          refreshToken: "",
          accessToken: "",
        },
      });
      const mailOptions = {
        from: "Auth test <testkea03@gmail.com>",
        to: `${user.email}`,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://localhost:3000/changePassword/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };
      console.log("sending mail");
      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", res);
          res.status(200).json("recovery email sent");
        }
      });
    }
  }
});

//export to api.js
module.exports = router;
