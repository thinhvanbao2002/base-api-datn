import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { OtpController } from "./otp.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OtpModel } from "./model/otp.model";

@Module({
	imports: [SequelizeModule.forFeature([OtpModel])],
	controllers: [OtpController],
	providers: [OtpService],
})
export class OtpModule {}
