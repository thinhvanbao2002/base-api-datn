import { Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";

import { GenericController } from "src/common/decorators/controller.decorator";
import { CreateChildCategoryDto } from "../dto/create-child-category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryAdminService } from "./category-admin.service";
import { SearchCategoryDto } from "../dto/search-category.dto";

@GenericController("a/category")
export class CategoryAdminController {
	constructor(private readonly categoryService: CategoryAdminService) {}

	@Post("child")
	async createChildCategory(@Body() createChildCategoryDto: CreateChildCategoryDto) {
		return await this.categoryService.createChildCategory(createChildCategoryDto);
	}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return await this.categoryService.create(createCategoryDto);
	}

	@Get("child")
	async findAllChildCategory(@Query() dto: SearchCategoryDto) {
		const categorys = this.categoryService.findAllChild(dto);
		return categorys;
	}

	@Get()
	async findAll(@Query() dto: SearchCategoryDto) {
		const categorys = this.categoryService.findAll(dto);
		return categorys;
	}

	@Get(":categoryId")
	findOne(@Param("categoryId") categoryId: number) {
		return this.categoryService.findOne(+categoryId);
	}

	@Patch(":categoryId")
	async update(@Param("categoryId") categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
		return await this.categoryService.update(+categoryId, updateCategoryDto);
	}

	@Delete(":categoryId")
	async remove(@Param("categoryId") categoryId: number) {
		return await this.categoryService.remove(+categoryId);
	}
}
