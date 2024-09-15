import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { SearchProductDto } from "./dto/search-product.dto";

@GenericController("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get("best-seller")
	async findBestSeller() {
		return await this.productService.findBestSeller();
	}

	@Get()
	async findAll(@Query() dto: SearchProductDto) {
		return await this.productService.findAll(dto);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		return await this.productService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productService.remove(+id);
	}
}
