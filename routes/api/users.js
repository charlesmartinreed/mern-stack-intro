const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// PUBLIC POST api/users - Register new user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Some very rudimentary validation right here
  if (!name || !email || !password) {
    // 400 BAD REQUEST
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    // already a registered user, return 400 BAD REQUEST
    if (user) return res.status(400).json({ msg: "User already exists" });

    // else, create the user
    const newUser = User({ name, email, password });

    // use bcrypt to salt and hash,
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // save user to the remote db
        newUser.save().then(user => {
          let secret =
            process.env.NODE_ENV === "production"
              ? process.env.jwtSecret
              : config.get("jwtSecret");

          // create auth jsonwebtoken; first param is the user id to help identify the user that is making the request
          // token expires in 3600 seconds, i.e, 1 hour
          jwt.sign(
            { id: user.id },
            secret,
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              // send a response that the user was successfully created
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                },
                // pass the token for authing routes
                token
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
