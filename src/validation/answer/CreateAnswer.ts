import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { CreateAnsewerBody } from '../../controllers/answer/AnswerController';

import { uuid, Answer } from '../JoiSchemas';

const createAnswerQueryJoiSchema = Joi.object<CreateAnsewerBody>({
	token: uuid.required(),
	value: Answer.answer.required()
});

export const createAnswerQuerySchema: ValidationSchema<CreateAnsewerBody> = {
	validate(data: CreateAnsewerBody): ValidationError | void {
		const { error } = createAnswerQueryJoiSchema.validate(data, { abortEarly: false });
		return error?.details;
	}
}
