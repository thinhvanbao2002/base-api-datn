import { EmailFieldOptional, StringFieldOptional } from "src/common/decorators/field.decorator";

export class AuthPayloadDto {
	@StringFieldOptional()
	email?: string;

	@StringFieldOptional()
	password?: string;
}
