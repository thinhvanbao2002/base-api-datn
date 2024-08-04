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
		console.log(dto);

		const products = await this.productAdminService.findAll(dto);
		return products;
	}

	@Get(":productId")
	async findOne(@Param("productId") productId: number) {
		return await this.productAdminService.findOne(+productId);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productAdminService.update(+id, updateProductDto);
	}

	@Delete(":productId")
	async remove(@Param("productId") productId: number) {
		return await this.productAdminService.remove(+productId);
	}
}
