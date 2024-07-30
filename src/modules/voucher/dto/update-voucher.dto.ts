import { PartialType } from "@nestjs/swagger";
import { CreateVoucherDto } from "./create-voucher.dto";
import {
	DateField,
	DateFieldOptional,
	NumberField,
	NumberFieldOptional,
	StringField,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";

export class UpdateVoucherDto {
	@StringField()
	name: string;

	@DateField()
	end_time: Date;

	@NumberField()
	discount_percent: number;
}
