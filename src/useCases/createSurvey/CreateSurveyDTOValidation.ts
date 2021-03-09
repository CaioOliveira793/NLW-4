import * as Joi from 'joi';

import { CreateSurveyRequestDTO } from './CreateSurveyUseCase';
import { Survey } from '../../validation/Schemas';

export const createSurveyRequestDTOSchema: Joi.ObjectSchema = Joi.object<CreateSurveyRequestDTO>({
	title: Survey.title.required(),
	description: Survey.description,
});
