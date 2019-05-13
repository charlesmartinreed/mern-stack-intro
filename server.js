const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

const items = require("./routes/api/items");

// MIDDLEWARE
app.use(express.json());

// Use routes
app.use("/api/items", items);

// Serve static assets IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  // set static folder to load the index.html in client/build
  app.use(express.static("client/build"));

  //any request that isn't api/items should hit this route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
