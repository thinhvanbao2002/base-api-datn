import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRoles } from "../user/types/user.type";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { SearchOrderDto } from "./dto/search-order.dto";
import { CancelOrderDto } from "./dto/cancel-order.dto";

@GenericController("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@Roles(UserRoles.CUSTOMER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
		return await this.orderService.create(createOrderDto, req);
	}

	@Get()
	@Roles(UserRoles.CUSTOMER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async findAll(dto: SearchOrderDto, @Request() req) {
		return await this.orderService.findAll(dto, req);
	}

	@Get(":id")
	@Roles(UserRoles.CUSTOMER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async findOne(@Param("id") id: number) {
		return await this.orderService.findOne(+id);
	}

	@Patch(":id")
	@Roles(UserRoles.CUSTOMER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async cancelOrder(@Param("id") id: number, @Body() dto: CancelOrderDto) {
		return this.orderService.cancelOrder(+id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.orderService.remove(+id);
	}
}
