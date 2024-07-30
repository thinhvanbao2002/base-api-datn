import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from "@nestjs/common";
import { VoucherAdminService } from "./voucher-admin.service";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { UpdateVoucherDto } from "../dto/update-voucher.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { FilterVoucherDto } from "../dto/filter-voucher.dto";
import { where, WhereOptions } from "sequelize";
import { Op } from "sequelize";

@GenericController("a/voucher")
export class VoucherAdminController {
	constructor(private readonly voucherService: VoucherAdminService) {}

	@Post()
	async create(@Body() createVoucherDto: CreateVoucherDto) {
		return await this.voucherService.create(createVoucherDto);
	}

	@Get()
	async findAll(@Query() dto: FilterVoucherDto) {
		const vouchers = await this.voucherService.findAll(dto);
		return vouchers;
	}

	@Get(":voucherId")
	async findOne(@Param("voucherId") voucherId: number) {
		const voucher = await this.voucherService.findOne(+voucherId);
		return voucher;
	}

	@Put(":voucherId")
	async update(@Param("voucherId") voucherId: string, @Body() updateVoucherDto: UpdateVoucherDto) {
		return this.voucherService.update(+voucherId, updateVoucherDto);
	}

	@Delete(":voucherId")
	async remove(@Param("voucherId") voucherId: number) {
		return await this.voucherService.remove(+voucherId);
	}
}
