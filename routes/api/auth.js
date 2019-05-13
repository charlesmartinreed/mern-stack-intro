const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// PUBLIC POST api/auth - Auth existing user
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Some very rudimentary validation right here
  if (!email || !password) {
    // 400 BAD REQUEST
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    // already a registered user, return 400 BAD REQUEST
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // compare plaintext password sent in body req to hashed password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // correct login, send token and user
      let secret =
        process.env.NODE_ENV === "production"
          ? process.env.jwtSecret
          : config.get("jwtSecret");

      jwt.sign(
        { id: user.id },
        secret,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            token
          });
        }
      );
    });
  });
});

module.exports = router;
