import { StringFieldOptional } from "src/common/decorators/field.decorator";

export class CreateUserDto {
	@StringFieldOptional()
	name?: string;

	@StringFieldOptional()
	phone?: string;
}
