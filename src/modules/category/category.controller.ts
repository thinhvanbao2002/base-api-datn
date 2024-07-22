import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { CreateChildCategoryDto } from "./dto/create-child-category.dto";
import { SearchCategoryDto } from "./dto/search-category.dto";

@GenericController("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post("child")
	async createChildCategory(@Body() createChildCategoryDto: CreateChildCategoryDto) {
		return await this.categoryService.createChildCategory(createChildCategoryDto);
	}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return await this.categoryService.create(createCategoryDto);
	}

	@Get()
	async findAll(@Query() dto: SearchCategoryDto) {
		const categorys = this.categoryService.findAll(dto);
		return categorys;
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.categoryService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoryService.update(+id, updateCategoryDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.categoryService.remove(+id);
	}
}
