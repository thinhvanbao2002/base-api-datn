import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { DateFieldOptional, NumberField } from "src/common/decorators/field.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "src/modules/order-detail/dto/create-order-detail.dto";
import { PageOptionsDto } from "src/common/dto/page-option.dto";

export class SearchOrderDto extends PageOptionsDto {
	@DateFieldOptional()
	from_date?: Date;

	@DateFieldOptional()
	to_date?: Date;
}
