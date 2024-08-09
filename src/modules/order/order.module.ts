import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./model/order.model";

@Module({
	imports: [SequelizeModule.forFeature([OrderModel])],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
