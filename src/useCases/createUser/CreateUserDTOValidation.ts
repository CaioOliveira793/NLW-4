import * as Joi from 'joi';

import { CreateUserRequestDTO } from './CreateUserUseCase';
import { User } from '../../validation/Schemas';

export const createUserRequestDTOSchema: Joi.ObjectSchema = Joi.object<CreateUserRequestDTO>({
	firstName: User.firstName.required(),
	lastName: User.lastName.required(),
	email: User.email.required()
});
