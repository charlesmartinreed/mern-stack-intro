const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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

    // else, create the user, use bcrypt to salt and hash, save user to the db
    const newUser = User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // send a response that the user was successfully created
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        });
      });
    });
  });
});

module.exports = router;
