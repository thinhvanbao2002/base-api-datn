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
import { ProductTypes } from "../types/product.type";
import { CategoryModel } from "src/modules/category/model/category.model";

@Table({
	tableName: "product",
})
export class ProductModel extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	@ForeignKey(() => CategoryModel)
	category_id: string;

	@BelongsTo(() => CategoryModel)
	category: CategoryModel;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	price: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	warranty_period: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	feature: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	weight: number;

	@Column({
		type: DataType.ENUM(...Object.values(ProductTypes)),
		allowNull: false,
	})
	product_type: ProductTypes;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	availability: boolean;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	status: boolean;

	@Column({
		type: DataType.INTEGER,
		defaultValue: true,
	})
	number_of_review: number;

	@Column({
		type: DataType.FLOAT,
		defaultValue: true,
	})
	rating_rate: number;

	@Column({
		type: DataType.INTEGER,
		defaultValue: true,
	})
	quantity: number;

	@Column({
		type: DataType.INTEGER,
		defaultValue: true,
	})
	sold: number;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
