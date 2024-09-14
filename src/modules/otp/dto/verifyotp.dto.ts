import { StringFieldOptional } from "src/common/decorators/field.decorator";

export class VerifyOtpDto {
	@StringFieldOptional()
	phone_number?: string;

	@StringFieldOptional()
	otp_code?: string;
}
