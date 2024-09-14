import { Module } from "@nestjs/common";
import { OverviewService } from "./overview.service";
import { OverviewController } from "./overview.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "../order/model/order.model";

@Module({
	imports: [SequelizeModule.forFeature([OrderModel])],
	controllers: [OverviewController],
	providers: [OverviewService],
})
export class OverviewModule {}
