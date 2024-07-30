import { Module } from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { VoucherController } from "./voucher.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { VoucherModel } from "./model/voucher.model";
import { VoucherAdminController } from "./admin/voucher-admin.controller";
import { VoucherAdminService } from "./admin/voucher-admin.service";
import { CustomerModel } from "../customer/model/customer.model";

@Module({
	imports: [SequelizeModule.forFeature([VoucherModel, CustomerModel])],
	controllers: [VoucherController, VoucherAdminController],
	providers: [VoucherService, VoucherAdminService],
})
export class VoucherModule {}
