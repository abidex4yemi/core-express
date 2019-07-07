const express = require('express');
const Router = express.Router();
const { validateUser } = require('../util/validateUser');
const { addUser, deleteUser, updateUser, getAllUser, getSingleUser } = require('../controller/User');

// All users route
Router.get('/users', getAllUser);

// Single users route
Router.get('/users/:id', getSingleUser);

// Create new user route
Router.post('/users', validateUser, addUser);

// Update user route
Router.put('/users/:id', validateUser, updateUser);

// Handle delete user route
Router.delete('/users/:id', deleteUser);

module.exports.userRoute = Router;
