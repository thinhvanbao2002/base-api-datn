import { NumberField } from "src/common/decorators/field.decorator";

export class CreateOrderDetailDto {
	@NumberField()
	product_id: number;

	@NumberField()
	quantity: number;

	@NumberField()
	price: number;
}
