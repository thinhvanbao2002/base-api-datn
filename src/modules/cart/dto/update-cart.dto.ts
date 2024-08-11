import { PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "./create-cart.dto";
import { NumberField, NumberFieldOptional } from "src/common/decorators/field.decorator";

export class UpdateCartDto {
	@NumberField()
	product_number: number;

	@NumberFieldOptional()
	total_price: number;
}
