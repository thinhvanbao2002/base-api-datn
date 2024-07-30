import {
	DateField,
	DateFieldOptional,
	NumberField,
	NumberFieldOptional,
	StringField,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";
import { PageOptionsDto } from "src/common/dto/page-option.dto";

export class FilterVoucherDto extends PageOptionsDto {
	@StringFieldOptional()
	name?: string;

	@DateFieldOptional()
	from_date?: Date;

	@DateFieldOptional()
	to_date?: Date;
}
