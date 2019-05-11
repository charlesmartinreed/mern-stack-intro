const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const items = require("./routes/api/items");

// MIDDLEWARE
app.use(express.json());

// Use routes
app.use("/api/items", items);

// DATABASE
const db = require("./config/keys").mongoURI;

// Connect to mLab DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server started on ${port}!`));
