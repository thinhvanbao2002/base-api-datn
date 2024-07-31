import {
	BooleanField,
	BooleanFieldOptional,
	DateFieldOptional,
	EnumField,
	EnumFieldOptional,
	NumberField,
	NumberFieldOptional,
	StringField,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";
import { ProductTypes } from "../types/product.type";
import { IsArray, IsOptional } from "class-validator";
import { CreateProductPhotoDto } from "src/modules/product-photo/dto/create-product-photo.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PageOptionsDto } from "src/common/dto/page-option.dto";

export class SearchProductDto extends PageOptionsDto {
	@EnumFieldOptional(() => ProductTypes)
	product_type?: ProductTypes;

	@BooleanFieldOptional()
	status?: boolean;

	@DateFieldOptional()
	from_date?: Date;

	@DateFieldOptional()
	to_date?: Date;

	@NumberFieldOptional()
	brand?: number;
}
