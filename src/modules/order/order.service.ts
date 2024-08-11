import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./model/order.model";
import { OrderDetailModel } from "../order-detail/model/order-detail.model";
import { OrderType } from "./types/order.type";
import { SearchOrderDto } from "./dto/search-order.dto";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";
import { CancelOrderDto } from "./dto/cancel-order.dto";
import { ProductModel } from "../product/model/product.model";
import { CustomerModel } from "../customer/model/customer.model";
import { UserModel } from "../user/model/user.model";

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel) private readonly orderRp: typeof OrderModel,
		@InjectModel(OrderDetailModel) private readonly orderDetailRp: typeof OrderDetailModel,
	) {}

	async create(createOrderDto: CreateOrderDto, req: any) {
		const { total_price, items } = createOrderDto;
		const customerId = req?.user?.id;

		await this.orderRp.sequelize.transaction(async transaction => {
			const order = await this.orderRp.create(
				{
					customer_id: customerId,
					order_status: OrderType.PENDING,
					total_price: total_price,
				},
				{ transaction },
			);

			if (items && items.length > 0) {
				const payloadOrderItem = items.map(i => {
					return {
						order_id: order.id,
						product_id: i.product_id,
						quantity: i.quantity,
						price: i.price,
					};
				});

				if (payloadOrderItem.length > 0) await this.orderDetailRp.bulkCreate(payloadOrderItem, { transaction });
			}
		});
	}

	async findAll(dto: SearchOrderDto, req: any) {
		const { from_date, to_date } = dto;
		const customerId = req?.user?.id;
		const dateConditions = [];
		const whereOptions: WhereOptions = {};

		whereOptions.customer_id = { [Op.eq]: customerId };

		if (from_date) {
			dateConditions.push({ [Op.gte]: from_date });
		}
		if (to_date) {
			dateConditions.push({ [Op.lte]: to_date });
		}
		if (dateConditions.length > 0) {
			whereOptions.created_at = { [Op.and]: dateConditions };
		}

		const orders = await this.orderRp.findAndCountAll({
			where: whereOptions,
			order: [["created_at", "DESC"]],
			limit: dto.take,
			offset: dto.skip,
		});

		return new PageDto(orders.rows, new PageMetaDto({ itemCount: orders.count, pageOptionsDto: dto }));
	}

	async findOne(id: number) {
		const foundOrder = await this.orderRp.findOne({
			where: { id: id },
			include: [
				{ model: OrderDetailModel, include: [{ model: ProductModel }] },
				{ model: CustomerModel, include: [{ model: UserModel }] },
			],
		});

		if (!foundOrder) {
			throw new NotFoundException("Đơn hàng không tồn tại!");
		}

		return foundOrder;
	}

	async cancelOrder(id: number, dto: CancelOrderDto) {
		const foundOrder = await this.orderRp.findOne({
			where: { id: id },
		});

		if (!foundOrder) {
			throw new NotFoundException("Đơn hàng không tồn tại!");
		}

		await this.orderRp.update(
			{
				order_status: OrderType.CANCELLED,
				cancel_reason: dto.cancel_reason,
			},
			{ where: { id: id } },
		);
	}

	remove(id: number) {
		return `This action removes a #${id} order`;
	}
}
