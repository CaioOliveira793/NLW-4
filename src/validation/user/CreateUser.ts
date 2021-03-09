import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { CreateUserBody } from '../../controllers/user/UserController';
import { User } from '../JoiSchemas';

const joiSchema = Joi.object<CreateUserBody>({
	firstName: User.firstName.required(),
	lastName: User.lastName.required(),
	email: User.email.required()
});

export const createUserBodySchema: ValidationSchema<CreateUserBody> = {
	validate(data: CreateUserBody): ValidationError | void {
		const { error } = joiSchema.validate(data);
		return error;
	}
}