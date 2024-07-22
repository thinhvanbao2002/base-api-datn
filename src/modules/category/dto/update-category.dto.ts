import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { BooleanFieldOptional, StringFieldOptional } from "src/common/decorators/field.decorator";

export class UpdateCategoryDto {
	@StringFieldOptional()
	name: string;

	@BooleanFieldOptional()
	status: boolean;
}
