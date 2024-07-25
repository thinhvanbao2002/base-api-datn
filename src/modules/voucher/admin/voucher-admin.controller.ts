import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VoucherAdminService } from "./voucher-admin.service";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { UpdateVoucherDto } from "../dto/update-voucher.dto";
import { GenericController } from "src/common/decorators/controller.decorator";

@GenericController("a/voucher")
export class VoucherAdminController {
	constructor(private readonly voucherService: VoucherAdminService) {}

	@Post()
	async create(@Body() createVoucherDto: CreateVoucherDto) {
		return await this.voucherService.create(createVoucherDto);
	}

	@Get()
	async findAll() {
		return this.voucherService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.voucherService.findOne(+id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
		return this.voucherService.update(+id, updateVoucherDto);
	}

	@Delete(":voucherId")
	async remove(@Param("id") id: string) {
		return this.voucherService.remove(+id);
	}
}
