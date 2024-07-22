import { BooleanFieldOptional, DateFieldOptional, StringFieldOptional } from "src/common/decorators/field.decorator";
import { PageOptionsDto } from "src/common/dto/page-option.dto";
import { PageDto } from "src/common/dto/page.dto";

export class SearchCategoryDto extends PageOptionsDto {
	@StringFieldOptional()
	name: string;

	@BooleanFieldOptional()
	status: boolean;

	@DateFieldOptional()
	from_date: Date;

	@DateFieldOptional()
	to_date: Date;
}
