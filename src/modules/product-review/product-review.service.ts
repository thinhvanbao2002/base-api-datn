import { Injectable } from "@nestjs/common";
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ProductReviewModel } from "./model/product-review.model";
import { CustomerModel } from "../customer/model/customer.model";
import { UserModel } from "../user/model/user.model";

@Injectable()
export class ProductReviewService {
	constructor(@InjectModel(ProductReviewModel) private readonly productReviewRepository: typeof ProductReviewModel) {}
	async create(createProductReviewDto: CreateProductReviewDto, req: any) {
		const customerId = req?.user?.id;
		const { product_id, review } = createProductReviewDto;

		const newReview = await this.productReviewRepository.create({
			customer_id: customerId,
			product_id,
			review,
		});

		return newReview;
	}

	async findAll(productId: number) {
		const reviews = await this.productReviewRepository.findAll({
			where: { product_id: productId },
			include: [{ model: CustomerModel, include: [{ model: UserModel }] }],
			order: [["created_at", "DESC"]],
		});
		return reviews;
	}

	findOne(id: number) {
		return `This action returns a #${id} productReview`;
	}

	update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
		return `This action updates a #${id} productReview`;
	}

	remove(id: number) {
		return `This action removes a #${id} productReview`;
	}
}
