/**
 * Module dependencies
 */
const Joi = require('@hapi/joi');

const validateUser = req => {
	// Define request body schema
	const userSchema = Joi.object().keys({
		name: Joi.string()
			.min(3)
			.required(),
		email: Joi.string()
			.email()
			.required()
	});

	// Validate request data against defined schema
	return Joi.validate(req.body, userSchema);
};

module.exports.validateUser = validateUser;
