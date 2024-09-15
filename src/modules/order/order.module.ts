import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./model/order.model";
import { OrderDetailModel } from "../order-detail/model/order-detail.model";
import { OrderAdminController } from "./admin/order-admin.controller";
import { OrderAdminService } from "./admin/order-admin.service";
import { ProductModel } from "../product/model/product.model";

@Module({
	imports: [SequelizeModule.forFeature([OrderModel, OrderDetailModel, ProductModel])],
	controllers: [OrderController, OrderAdminController],
	providers: [OrderService, OrderAdminService],
})
export class OrderModule {}
