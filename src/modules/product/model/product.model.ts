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
import { ProductTypes } from "../types/product.type";
import { CategoryModel } from "src/modules/category/model/category.model";
import { ProductPhotoModel } from "src/modules/product-photo/model/product-photo.model";
import { getFullUrl } from "src/common/helpers/ultils";

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
	name: string; // Tên sản phẩm bắt buộc

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	@ForeignKey(() => CategoryModel)
	category_id: number; // Mã danh mục bắt buộc

	@BelongsTo(() => CategoryModel)
	category: CategoryModel;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	price: number; // giá tiền bắt buộc

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	warranty_period: number; // thời gian bảo hành bắt buộc

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	feature: string; // tính năng bắt buộc

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	weight: number; // cân nặng bắt buộc

	@Column({
		type: DataType.ENUM(...Object.values(ProductTypes)),
		allowNull: false,
	})
	product_type: ProductTypes; // Loại hàng bt buộc

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	availability: boolean; // tình trạng (còn hàng, hết hàng)

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	status: boolean; // trạng thái

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	number_of_review: number; // Số lượng đánh giá

	@Column({
		type: DataType.FLOAT,
		defaultValue: 5,
	})
	rating_rate: number; // tỉ lệ sao

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	quantity: number; // Số lượng còn bắt buộc

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	sold: number; // Số lượng đã bán

	@Column({
		type: DataType.TEXT,
	})
	description: string; // Số lượng đã bán

	@Column({
		type: DataType.STRING,
		get(): string {
			return getFullUrl(this.getDataValue("image"));
		},
	})
	image: string; // Số lượng đã bán

	@HasMany(() => ProductPhotoModel)
	product_photo: ProductPhotoModel[];

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
