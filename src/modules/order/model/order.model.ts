import {
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	DeletedAt,
	ForeignKey,
	HasMany,
	Model,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { ProductModel } from "src/modules/product/model/product.model";
import { UserModel } from "src/modules/user/model/user.model";
import { OrderType } from "../types/order.type";
import { OrderDetailModel } from "src/modules/order-detail/model/order-detail.model";

@Table({
	tableName: "order",
})
export class OrderModel extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => CustomerModel)
	customer_id: number;

	@BelongsTo(() => CustomerModel)
	customer: CustomerModel;

	@Column({
		type: DataType.ENUM(...Object.values(OrderType)),
	})
	order_status: string;

	@Column({
		type: DataType.BIGINT,
	})
	total_price: number;

	@Column({
		type: DataType.STRING,
	})
	cancel_reason: string;

	@Column({
		type: DataType.STRING,
	})
	name: string;

	@Column({
		type: DataType.STRING,
	})
	phone: string;

	@Column({
		type: DataType.STRING,
	})
	address: string;

	@Column({
		type: DataType.TEXT,
	})
	note: string;

	@HasMany(() => OrderDetailModel)
	order_details: OrderDetailModel[];

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
