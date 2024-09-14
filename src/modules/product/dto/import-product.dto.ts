import { NumberField, StringFieldOptional } from "src/common/decorators/field.decorator";
import { PageOptionsDto } from "src/common/dto/page-option.dto";

export class ImportProductDto {
	@NumberField()
	quantity: number;

	@StringFieldOptional()
	note?: string;
}
