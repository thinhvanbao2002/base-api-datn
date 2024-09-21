import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { EnumFieldOptional, NumberField, StringFieldOptional } from "src/common/decorators/field.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "src/modules/order-detail/dto/create-order-detail.dto";
import { PayTypes } from "../types/order.type";

export class CreateOrderDto {
	@StringFieldOptional()
	name?: string;

	@StringFieldOptional()
	phone?: string;

	@StringFieldOptional()
	address?: string;

	@StringFieldOptional()
	note?: string;

	@NumberField()
	customer_id: number;

	@NumberField()
	total_price: number;

	@IsArray()
	@ApiProperty()
	@IsOptional()
	items: CreateOrderDetailDto[];

	@EnumFieldOptional(() => PayTypes)
	pay_type?: PayTypes;
}
