import {
	BooleanField,
	BooleanFieldOptional,
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

export class UpdateProductDto {
	@StringFieldOptional()
	name?: string;

	@NumberFieldOptional()
	category_id?: number;

	@NumberFieldOptional()
	price?: number;

	@NumberFieldOptional()
	warranty_period?: string;

	@StringFieldOptional()
	feature?: string;

	@NumberFieldOptional()
	weight?: number;

	@EnumFieldOptional(() => ProductTypes)
	product_type?: ProductTypes;

	@BooleanFieldOptional()
	status?: boolean;

	@NumberFieldOptional()
	quantity?: number;

	@IsArray()
	@IsOptional()
	@ApiProperty()
	product_photo: CreateProductPhotoDto[];

	@StringFieldOptional()
	description?: string;

	@StringField()
	image: string;
}
