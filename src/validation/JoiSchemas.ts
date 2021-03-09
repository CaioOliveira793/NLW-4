import * as Joi from 'joi';

export const array = Joi.array();

export const pageList = Joi
	.number()
	.min(1);

export const uuid = Joi
	.string()
	.uuid({ version: 'uuidv4' });

export const email = Joi
	.string()
	.email();

export const User = {
	firstName: Joi
		.string()
		.min(3)
		.max(40)
		.pattern(/^[A-Z]{1}[a-zà-ü]+$/),
	lastName: Joi
		.string()
		.min(3)
		.max(40)
		.pattern(/^[A-Z]{1}[a-zà-ü]+$/),
	email
}

export const Survey = {
	title: Joi
		.string()
		.max(30),
	description: Joi
		.string()
		.max(512)
}

export const Answer = {
	userId: uuid,
	surveyId: uuid,
	answer: Joi
		.number()
		.integer()
		.min(1)
		.max(10)
}
