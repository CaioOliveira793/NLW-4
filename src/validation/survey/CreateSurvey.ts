import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { CreateSurveyBody } from '../../controllers/survey/SurveyController';

import { Survey } from '../JoiSchemas';

const createSurveyBodyJoiSchema = Joi.object<CreateSurveyBody>({
	title: Survey.title.required(),
	description: Survey.description,
});

export const createSurveyBodySchema: ValidationSchema<CreateSurveyBody> = {
	validate(data: CreateSurveyBody): ValidationError | void {
		const { error } = createSurveyBodyJoiSchema.validate(data);
		return error;
	}
}
