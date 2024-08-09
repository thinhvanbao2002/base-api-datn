import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { CartModel } from "./model/cart.model";

@Module({
	imports: [SequelizeModule.forFeature([CartModel])],
	controllers: [CartController],
	providers: [CartService],
})
export class CartModule {}
