const express = require('express');

// interact directly with mongoDB
const mongoose = require('mongoose');

// take requests, get data from body when, for instance, making a POST request
const bodyParser = require('body-parser');

// api routing
const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// anythign that hits api/items should utilize the
app.use('/api/items', items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started up on port ${port}`));
