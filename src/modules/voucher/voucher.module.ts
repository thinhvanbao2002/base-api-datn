import { Module } from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { VoucherController } from "./voucher.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { VoucherModel } from "./model/voucher.model";

@Module({
	imports: [SequelizeModule.forFeature([VoucherModel])],
	controllers: [VoucherController],
	providers: [VoucherService],
})
export class VoucherModule {}
