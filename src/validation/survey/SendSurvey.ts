import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { SendSurveyBody } from '../../controllers/survey/SurveyController';

import { uuid, array } from '../JoiSchemas';

const sendSurveyBodyJoiSchema = Joi.object<SendSurveyBody>({
	surveyId: uuid.required(),
	userIds: array.required().items(uuid)
});

export const sendSurveyBodySchema: ValidationSchema<SendSurveyBody> = {
	validate(data: SendSurveyBody): ValidationError | void {
		const { error } = sendSurveyBodyJoiSchema.validate(data);
		return error;
	}
}
