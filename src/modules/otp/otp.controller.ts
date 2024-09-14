import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { UpdateOtpDto } from "./dto/update-otp.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { VerifyOtpDto } from "./dto/verifyotp.dto";

@GenericController("otp")
export class OtpController {
	constructor(private readonly otpService: OtpService) {}
	@Post("send")
	async sendOtp(@Body() dto: CreateOtpDto) {
		const otpCode = await this.otpService.generateOtp(dto);
		return otpCode;
	}

	@Post("verify")
	async verifyOtp(@Body() dto: VerifyOtpDto) {
		console.log(dto);

		const isValid = await this.otpService.verifyOtp(dto);

		return isValid;
	}
}
