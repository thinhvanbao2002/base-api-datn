import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { UpdateOtpDto } from "./dto/update-otp.dto";
import { OtpModel } from "./model/otp.model";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { VerifyOtpDto } from "./dto/verifyotp.dto";

@Injectable()
export class OtpService {
	constructor(@InjectModel(OtpModel) private readonly otpRepository: typeof OtpModel) {}

	async generateOtp(dto: CreateOtpDto): Promise<any> {
		const { phone_number } = dto;
		const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Random OTP 6 số
		const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP hết hạn sau 5 phút
		const formattedExpiry = this.formatDateToMySQL(expiry);

		await this.otpRepository.create({
			phone_number,
			otp_code: otpCode,
			expired_time: formattedExpiry,
			attempt_remain: 5,
		});

		// Gửi OTP qua API
		const response = await axios.post(
			"https://api.ezsale.vn/partner/customer/send-message-zns-customer",
			{
				customer_info: {
					name: "go19",
					phone: phone_number,
					additional_data: {
						otp: otpCode,
					},
				},
				zns_message_template_id: 72,
			},
			{
				headers: {
					Accept: "*/*",
					// eslint-disable-next-line @typescript-eslint/naming-convention
					"Content-Type": "application/json",
					api: "PclF2sjTUQp8NUQb8swmGg",
				},
			},
		);

		return {
			otp: otpCode,
			message: response.data.data,
		};
	}

	// Xác thực OTP
	async verifyOtp(dto: VerifyOtpDto): Promise<any> {
		const { phone_number, otp_code } = dto;
		const otp = await this.otpRepository.findOne({
			where: { phone_number: phone_number },
			order: [["created_at", "DESC"]],
		});

		if (!otp) {
			throw new NotFoundException("OTP không tồn tại");
		}

		if (otp.attempt_remain <= 0) {
			throw new BadRequestException("Vượt quá số lần thử");
		}

		if (new Date() > otp.expired_time) {
			throw new BadRequestException("OTP đã hết hạn");
		}

		if (otp.otp_code !== otp_code) {
			otp.attempt_remain -= 1;
			await otp.save(); // Cập nhật số lần thử
			throw new BadRequestException("OTP không chính xác");
		} else {
			await this.otpRepository.destroy({ where: { phone_number: phone_number } });
		}

		// Xác thực thành công: Xóa OTP

		return true;
	}

	formatDateToMySQL(date: Date): string {
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2); // Thêm số 0 phía trước nếu cần
		const day = ("0" + date.getDate()).slice(-2);
		const hours = ("0" + date.getHours()).slice(-2);
		const minutes = ("0" + date.getMinutes()).slice(-2);
		const seconds = ("0" + date.getSeconds()).slice(-2);

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
}
