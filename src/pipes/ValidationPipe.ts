import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { ValidationSchema } from '../validation/ValidationSchema';
import { MalformatedException } from '../exceptions/resource/MalformatedException';


@Injectable()
export class ValidationPipe implements PipeTransform {
	constructor(
		private readonly validationSchema: ValidationSchema<unknown>,
	) { }

	transform(value: unknown, metadata: ArgumentMetadata): unknown {
		const error = this.validationSchema.validate(value);

		if (error) {
			let message: string;
			switch (metadata.type) {
				case 'body':
				case 'query':
				case 'param':
					message = `Error validating data in request ${metadata.type}`;
					break;

				case 'custom':
				default:
					message = 'Error validating data';
					break;
			}

			throw new MalformatedException(message, error);
		}

		return value;
	}

}
