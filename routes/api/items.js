const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// bring in the Item model
const Item = require("../../models/Item");

// PUBLIC GET route - api/items - get all items
router.get("/", (req, res) => {
  // return sorted items, descending
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// PROTECTED POST route - api/items - post a new item
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// PROTECTED DELETE route - api/items - delete an existing item
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
