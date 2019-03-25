// routes to and from our API, using express router
const express = require('express');
const router = express.Router();

// bring in the item model
const Item = require('../../models/Item');


// @route GET api/items - Get all items, public access
router.get('/', (req, res) => {
	// since we're already pointing toward api/items (see server.js), we don't have to specify that here
	//fetch items from the database
	Item.find()
		.sort({ date: -1 }) //-1 means sort descending
		.then(items => res.json(items))
});

// @route POST api/items - Create an item, public access
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save() //this saves to the DB
		.then(item => res.json(item));
});

// @route DELETE api/items/:id - delete an item, public access
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
});

// allows other app files to read contents of this file
module.exports = router;
