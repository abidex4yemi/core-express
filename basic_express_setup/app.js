/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const { userRoute } = require('./routes/userRoute');

// Create an express application
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
	return res.status(200).json({ message: 'This is the home right' });
});

app.use('/api/v1', userRoute);

app.all('*', (req, res) => {
	return res.status(404).json({ message: 'Route does not exist' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
