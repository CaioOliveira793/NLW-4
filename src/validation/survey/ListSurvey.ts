import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { ListSurveysQuery } from '../../controllers/survey/SurveyController';

import { pageList, Survey } from '../JoiSchemas';


const listSurveysQueryJoiSchema = Joi.object<ListSurveysQuery>({
	title: Survey.title,
	des: Survey.description,
	page: pageList
});

export const listSurveysQuerySchema: ValidationSchema<ListSurveysQuery> = {
	validate(data: ListSurveysQuery): ValidationError | void {
		const { error } = listSurveysQueryJoiSchema.validate(data, { abortEarly: false });
		return error?.details;
	}
}
