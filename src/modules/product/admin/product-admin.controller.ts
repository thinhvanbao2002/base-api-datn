import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";

import { GenericController } from "src/common/decorators/controller.decorator";
import { ProductAdminService } from "./product-admin.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { SearchProductDto } from "../dto/search-product.dto";

@GenericController("a/product")
export class ProductAdminController {
	constructor(private readonly productAdminService: ProductAdminService) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		return await this.productAdminService.create(createProductDto);
	}

	@Get()
	async findAll(@Query() dto: SearchProductDto) {
		const products = await this.productAdminService.findAll(dto);
		return products;
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.productAdminService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productAdminService.update(+id, updateProductDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productAdminService.remove(+id);
	}
}
