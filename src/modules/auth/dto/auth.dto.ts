import {
	EmailFieldOptional,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";

export class AuthPayloadDto {
	@EmailFieldOptional()
	email?: string;

	@StringFieldOptional()
	password?: string;
}
