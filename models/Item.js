const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// creating a model from our schema
module.exports = Item = mongoose.model('item', ItemSchema);
