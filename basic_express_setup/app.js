/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const { validateUser } = require('./helper');

// Create an express application
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Initial list of users
let users = [
	{
		id: 1,
		name: 'Yemi',
		email: 'test@gmail.com'
	},
	{
		id: 2,
		name: 'Tola',
		email: 't@gmail.com'
	}
];

// Home route
app.get('/', (req, res) => {
	return res.status(200).json({ message: 'This is the home right' });
});

// All users route
app.get('/users', (req, res) => {
	const { sortBy } = req.query;
	let allUsers = [];

	if (sortBy && sortBy.trim() !== '') {
		allUsers = users.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});
	} else {
		allUsers = users;
	}

	return res.status(200).json({
		message: 'List of all users',
		allUsers
	});
});

// Single users route
app.get('/users/:id', (req, res) => {
	const { id } = req.params;

	const user = users.find(user => parseInt(id, 10) === user.id);

	if (user) {
		return res.status(200).json({ user });
	}

	return res.status(404).json({ message: `User's with ID of ${id} not found` });
});

// Create new user route
app.post('/users', (req, res) => {
	const { error, value } = validateUser(req);
	// Return error if request body is invalid
	if (error) {
		return res.status(400).json(error.details);
	}

	// Construct new user
	const newUser = {
		id: users.length + 1,
		...value
	};

	// Add new user to existing users list
	users.unshift(newUser);

	return res.status(201).json(newUser);
});

// Update user route
app.put('/users/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	const user = users.find(user => user.id === id);

	if (!user) {
		return res.status(401).json({ message: `User with ID of ${id} is not found` });
	}

	const { error, value } = validateUser(req);

	if (error) {
		return res.status(400).json(error.details);
	}

	const allUsers = users.filter(user => user.id !== id);

	users = [...allUsers, value];
	return res.status(200).json(users);
});

app.delete('/users/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	const user = users.find(user => user.id === id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	users = users.filter(user => user.id !== id);

	return res.status(200).json(users);
});

app.listen(PORT, console.log('Server running on port:' + PORT));
