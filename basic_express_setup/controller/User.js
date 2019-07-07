let { users } = require('../data/users');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addUser = (req, res) => {
	// Construct new user
	const newUser = {
		id: users.length + 1,
		...req.body.user
	};

	// Add new user to existing users list
	users.unshift(newUser);

	return res.status(201).json(newUser);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = (req, res) => {
	const id = parseInt(req.params.id, 10);

	const user = users.find(user => user.id === id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	users = users.filter(user => user.id !== id);

	return res.status(200).json(users);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getSingleUser = (req, res) => {
	const { id } = req.params;

	const user = users.find(user => parseInt(id, 10) === user.id);

	if (user) {
		return res.status(200).json({ user });
	}

	return res.status(404).json({ message: `User's with ID of ${id} not found` });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllUser = (req, res) => {
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
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = (req, res) => {
	const id = parseInt(req.params.id, 10);

	const user = users.find(user => user.id === id);

	if (!user) {
		return res.status(401).json({ message: `User with ID of ${id} is not found` });
	}

	const allUsers = users.filter(user => user.id !== id);

	users = [...allUsers, { id: user.id, ...req.body.user }];
	return res.status(200).json(users);
};

module.exports = {
	addUser,
	deleteUser,
	getSingleUser,
	getAllUser,
	updateUser
};
