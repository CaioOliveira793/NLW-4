import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { CreateAnsewerQuery } from '../../controllers/answer/AnswerController';

import { uuid, Answer } from '../JoiSchemas';

const createAnswerQueryJoiSchema = Joi.object<CreateAnsewerQuery>({
	tk: uuid.required(),
	v: Answer.answer.required()
});

export const createAnswerQuerySchema: ValidationSchema<CreateAnsewerQuery> = {
	validate(data: CreateAnsewerQuery): ValidationError | void {
		const { error } = createAnswerQueryJoiSchema.validate(data);
		return error;
	}
}
