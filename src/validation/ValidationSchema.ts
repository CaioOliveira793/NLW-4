import { ValidationErrorItem } from 'joi';

export type ValidationError = ValidationErrorItem[];

export interface ValidationSchema<T> {
	validate(data: T): ValidationError | void;
}
