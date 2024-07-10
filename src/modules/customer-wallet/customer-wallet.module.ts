import { Module } from "@nestjs/common";
import { CustomerWalletService } from "./customer-wallet.service";
import { CustomerWalletController } from "./customer-wallet.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { CustomerWalletModel } from "./model/customer-wallet.model";

@Module({
	imports: [SequelizeModule.forFeature([CustomerWalletModel])],
	controllers: [CustomerWalletController],
	providers: [CustomerWalletService],
})
export class CustomerWalletModule {}
