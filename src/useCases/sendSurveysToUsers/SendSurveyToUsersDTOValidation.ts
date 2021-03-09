import * as Joi from 'joi';

import { SendSurveysToUsersRequestDTO } from './SendSurveysToUsersUseCase';
import { uuid, array } from '../../validation/Schemas';


export const sendSurveysToUsersRequestDTOSchema = Joi.object<SendSurveysToUsersRequestDTO>({
	surveyId: uuid.required(),
	userIds: array.required().items(uuid)
});
