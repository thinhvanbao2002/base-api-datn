import { BooleanFieldOptional, DateFieldOptional } from "src/common/decorators/field.decorator";
import { PageOptionsDto } from "src/common/dto/page-option.dto";

export class FilterCustomerDto extends PageOptionsDto {
	@BooleanFieldOptional()
	status: boolean;

	@DateFieldOptional()
	from_date: Date;

	@DateFieldOptional()
	to_date: Date;
}
