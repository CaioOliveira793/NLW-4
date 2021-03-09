import * as Joi from 'joi';

import { ListSurveysRequestDTO } from './ListSurveysUseCase';
import { Survey, pageList } from '../../validation/Schemas';

export const listSurveyRequestDTOSchema: Joi.ObjectSchema = Joi.object<ListSurveysRequestDTO>({
	title: Survey.title,
	description: Survey.description,
	page: pageList
});
