import { NumberField, StringFieldOptional } from "src/common/decorators/field.decorator";

export class CreateProductReviewDto {
	@NumberField()
	product_id: number;

	@StringFieldOptional()
	review?: string;
}
