import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CartModel } from "./model/cart.model";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";

@Injectable()
export class CartService {
	constructor(@InjectModel(CartModel) private readonly cartRepository: typeof CartModel) {}

	async create(createCartDto: CreateCartDto, req: any) {
		const { product_id, product_number, total_price } = createCartDto;
		const customerId = req?.user?.id;

		if (product_number < 1) {
			throw new BadRequestException("Số lượng sản phẩm phải lớn hơn 1!");
		}

		const cart = await this.cartRepository.create({
			customer_id: customerId,
			product_id: product_id,
			product_number: product_number,
			total_price: total_price,
		});

		return cart;
	}

	async findAll(req: any) {
		const customerId = req?.user?.id;

		const carts = await this.cartRepository.findAll({
			where: { customer_id: customerId },
		});

		return carts;
	}

	findOne(id: number) {
		return `This action returns a #${id} cart`;
	}

	async update(id: number, updateCartDto: UpdateCartDto) {
		const { product_number, total_price } = updateCartDto;

		const foundCart = await this.cartRepository.findOne({
			where: { id: id },
		});

		if (!foundCart) {
			throw new NotFoundException("Sản phẩm trong giỏ hàng không tồn tại!");
		}

		await this.cartRepository.update(
			{
				product_number,
				total_price,
			},
			{
				where: { id: id },
			},
		);
	}

	async remove(id: number) {
		const foundCart = await this.cartRepository.findOne({
			where: { id: id },
		});

		if (!foundCart) {
			throw new NotFoundException("Sản phẩm trong giỏ hàng không tồn tại!");
		}

		await this.cartRepository.destroy({
			where: { id: id },
		});
	}
}
