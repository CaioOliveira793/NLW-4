import { Injectable, PipeTransform } from '@nestjs/common';

import { ValidationSchema } from '../validation/ValidationSchema';
import { MalformatedException } from '../exceptions/resource/MalformatedException';


@Injectable()
export class ValidationPipe implements PipeTransform {
	constructor(
		private readonly validationSchema: ValidationSchema<unknown>,
	) {}

	transform(value: unknown): unknown {
		const error = this.validationSchema.validate(value);

		if (error) {
			throw new MalformatedException('Data validation error', error);
		}

		return value;
	}

}
