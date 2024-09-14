import { StringFieldOptional } from "src/common/decorators/field.decorator";

export class CreateOtpDto {
	@StringFieldOptional()
	phone_number?: string;
}
