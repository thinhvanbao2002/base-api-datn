import { NumberField, NumberFieldOptional } from "src/common/decorators/field.decorator";

export class CreateCartDto {
	@NumberField()
	product_id: number;

	@NumberField()
	product_number: number;

	@NumberFieldOptional()
	total_price: number;
}
