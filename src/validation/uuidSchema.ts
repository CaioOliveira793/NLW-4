import { ValidationSchema, ValidationError } from './ValidationSchema';

import { uuid } from './JoiSchemas';

export const uuidSchema: ValidationSchema<string> = {
	validate(data: string): ValidationError | void {
		const { error } = uuid.validate(data);
		return error;
	}
}
