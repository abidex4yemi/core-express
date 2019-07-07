/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Users
const users = [
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
	if (req.body) {
		const newUser = {
			...req.body,
			id: users.length + 1
		};
		users.push(newUser);

		return res.status(201).json({ users });
	}

	return res.status(500).json({ message: 'Try again...' });
});

app.listen(PORT, console.log('Server running on port:' + PORT));
