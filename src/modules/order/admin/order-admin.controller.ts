import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from "@nestjs/common";
import { GenericController } from "src/common/decorators/controller.decorator";
import { UpdateOrderDetailDto } from "src/modules/order-detail/dto/update-order-detail.dto";
import { SearchOrderDto } from "../dto/search-order.dto";
import { OrderAdminService } from "./order-admin.service";
import { SearchOrderAdminDto } from "../dto/search-order-admin.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";

@GenericController("a/order")
export class OrderAdminController {
	constructor(private readonly orderAdminService: OrderAdminService) {}

	@Get()
	async findAll(@Query() dto: SearchOrderAdminDto) {
		return await this.orderAdminService.findAll(dto);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.orderAdminService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: number, @Body() dto: UpdateOrderDto) {
		return this.orderAdminService.update(+id, dto);
	}
}
