import * as Joi from 'joi';

import { ValidationSchema, ValidationError } from '../ValidationSchema';

import { ListSurveysBody, ListSurveysQuery } from '../../controllers/survey/SurveyController';

import { pageList, Survey } from '../JoiSchemas';


const listSurveysBodyJoiSchema = Joi.object<ListSurveysBody>({
	title: Survey.title,
	description: Survey.description,
});

export const listSurveysBodySchema: ValidationSchema<ListSurveysBody> = {
	validate(data: ListSurveysBody): ValidationError | void {
		const { error } = listSurveysBodyJoiSchema.validate(data, { abortEarly: false });
		return error?.details;
	}
}


const listSurveysQueryJoiSchema = Joi.object<ListSurveysQuery>({
	page: pageList
});

export const listSurveysQuerySchema: ValidationSchema<ListSurveysQuery> = {
	validate(data: ListSurveysQuery): ValidationError | void {
		const { error } = listSurveysQueryJoiSchema.validate(data, { abortEarly: false });
		return error?.details;
	}
}
