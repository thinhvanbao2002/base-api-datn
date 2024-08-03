import {
	BooleanField,
	EnumField,
	NumberField,
	NumberFieldOptional,
	StringField,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";
import { ProductTypes } from "../types/product.type";
import { IsArray, IsOptional } from "class-validator";
import { CreateProductPhotoDto } from "src/modules/product-photo/dto/create-product-photo.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
	@StringField()
	name: string;

	@NumberField()
	category_id: number;

	@NumberField()
	price: number;

	@NumberField()
	warranty_period: string;

	@StringField()
	feature: string;

	@NumberField()
	weight: number;

	@EnumField(() => ProductTypes)
	product_type: ProductTypes;

	@NumberField()
	quantity: number;

	@IsArray()
	@IsOptional()
	@ApiProperty()
	product_photo: CreateProductPhotoDto[];

	@StringFieldOptional()
	description?: string;

	@StringField()
	image: string;
}
