import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { MalformatedException } from '../exceptions/resource/MalformatedException';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(
		private readonly validationSchema: ObjectSchema,
	) {}

	transform(value: unknown): unknown {
		const { error } = this.validationSchema.validate(value, { abortEarly: false });

		if (error) {
			throw new MalformatedException('Data validation error', error);
		}

		return value;
	}

}
