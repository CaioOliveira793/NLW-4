import { ValidationError as JoiValidationError } from 'joi';

export type ValidationError = JoiValidationError;

export interface ValidationSchema<T> {
	validate(data: T): ValidationError | void;
}
