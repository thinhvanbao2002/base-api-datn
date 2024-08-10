import { IsArray, IsOptional } from "class-validator";
import { NumberField } from "src/common/decorators/field.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "src/modules/order-detail/dto/create-order-detail.dto";

export class CancelOrderDto {
	@NumberField()
	cancel_reason: number;
}
