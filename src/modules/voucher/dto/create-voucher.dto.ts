import { DateField, NumberField, NumberFieldOptional, StringField } from "src/common/decorators/field.decorator";

export class CreateVoucherDto {
	@StringField()
	name: string;

	@DateField()
	end_time: Date;

	@NumberField()
	discount_percent: number;
}
