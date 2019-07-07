/**
 * Module dependencies
 */
const Joi = require('@hapi/joi');

const validateUser = (req, res, next) => {
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
	const { error, value } = Joi.validate(req.body, userSchema);

	if (error) {
		return res.status(400).json(error.details);
	}

	req.body.user = value;

	return next();
};

module.exports.validateUser = validateUser;
