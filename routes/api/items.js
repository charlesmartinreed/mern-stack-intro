const express = require("express");
const router = express.Router();

// bring in the Item model
const Item = require("../../models/Item");

// PUBLIC GET route - api/items - get all items
router.get("/", (req, res) => {
  // return sorted items, descending
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// PUBLIC POST route - api/items - post a new item
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});
module.exports = router;
