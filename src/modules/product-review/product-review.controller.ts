import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { ProductReviewService } from "./product-review.service";
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRoles } from "../user/types/user.type";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller("product-review")
export class ProductReviewController {
	constructor(private readonly productReviewService: ProductReviewService) {}

	@Post()
	@Roles(UserRoles.CUSTOMER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createProductReviewDto: CreateProductReviewDto, @Request() req) {
		return await this.productReviewService.create(createProductReviewDto, req);
	}

	@Get(":productId")
	async findAll(@Param("productId") productId: number) {
		return this.productReviewService.findAll(+productId);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.productReviewService.findOne(+id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateProductReviewDto: UpdateProductReviewDto) {
		return this.productReviewService.update(+id, updateProductReviewDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.productReviewService.remove(+id);
	}
}
