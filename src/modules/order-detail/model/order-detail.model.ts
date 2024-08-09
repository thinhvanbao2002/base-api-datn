export class OrderDetail {}
import {
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { ProductModel } from "src/modules/product/model/product.model";
import { UserModel } from "src/modules/user/model/user.model";

@Table({
	tableName: "order_detail",
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
	@ForeignKey(() => OrderModel)
	order_id: number;

	@BelongsTo(() => OrderModel)
	order: OrderModel;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => ProductModel)
	product_id: number;

	@BelongsTo(() => ProductModel)
	product: ProductModel;

	@Column({
		type: DataType.INTEGER,
	})
	quantity: number;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
