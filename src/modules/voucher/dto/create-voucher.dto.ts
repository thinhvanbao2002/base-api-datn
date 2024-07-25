import { DateField, NumberField, NumberFieldOptional, StringField } from "src/common/decorators/field.decorator";

export class CreateVoucherDto {
	@StringField()
	name: string;

	@DateField()
	start_time: Date;

	@DateField()
	end_time: Date;

	@NumberField()
	discount_percent: number;

	@NumberFieldOptional()
	customer_id?: number;
}
