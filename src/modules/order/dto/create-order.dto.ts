import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { NumberField } from "src/common/decorators/field.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "src/modules/order-detail/dto/create-order-detail.dto";

export class CreateOrderDto {
	@NumberField()
	customer_id: number;

	@NumberField()
	total_price: number;

	@IsArray()
	@ApiProperty()
	@IsOptional()
	items: CreateOrderDetailDto[];
}
