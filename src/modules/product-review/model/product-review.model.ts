import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { ProductModel } from "src/modules/product/model/product.model";

@Table({
	tableName: "product_review",
})
export class ProductReviewModel extends Model {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: DataType.INTEGER })
	@ForeignKey(() => CustomerModel)
	customer_id: number;

	@BelongsTo(() => CustomerModel)
	customer: CustomerModel;

	@Column({ type: DataType.INTEGER })
	@ForeignKey(() => ProductModel)
	product_id: number;

	@BelongsTo(() => ProductModel)
	product: ProductModel;

	@Column({ type: DataType.TEXT })
	review: string;
}
