import { Module } from "@nestjs/common";
import { CustomerWalletHistoryService } from "./customer-wallet-history.service";
import { CustomerWalletHistoryController } from "./customer-wallet-history.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { CustomerWalletHistoryModel } from "./model/customer-wallet-history.model";

@Module({
	imports: [SequelizeModule.forFeature([CustomerWalletHistoryModel])],
	controllers: [CustomerWalletHistoryController],
	providers: [CustomerWalletHistoryService],
})
export class CustomerWalletHistoryModule {}
