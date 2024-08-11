import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDetailDto } from "src/modules/order-detail/dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "src/modules/order-detail/dto/update-order-detail.dto";
import { SearchOrderAdminDto } from "../dto/search-order-admin.dto";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "../model/order.model";
import { OrderDetailModel } from "src/modules/order-detail/model/order-detail.model";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { UserModel } from "src/modules/user/model/user.model";
import { ProductModel } from "src/modules/product/model/product.model";
import { UpdateOrderDto } from "../dto/update-order.dto";

@Injectable()
export class OrderAdminService {
	constructor(
		@InjectModel(OrderModel) private readonly orderRp: typeof OrderModel,
		@InjectModel(OrderDetailModel) private readonly orderDetailRp: typeof OrderDetailModel,
	) {}

	async findAll(dto: SearchOrderAdminDto) {
		const { order_status, from_date, to_date } = dto;

		const dateConditions = [];
		const whereOptions: WhereOptions = {};

		whereOptions.order_status = { [Op.eq]: order_status };

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

	async update(id: number, dto: UpdateOrderDto) {
		const { order_status } = dto;

		const foundOrder = await this.orderRp.findOne({
			where: { id: id },
		});

		if (!foundOrder) {
			throw new NotFoundException("Đơn hàng không tồn tại!");
		}

		await this.orderRp.update(
			{
				order_status: order_status,
			},
			{
				where: { id: id },
			},
		);
	}
}
