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
import { UserModel } from "src/modules/user/model/user.model";

@Table({
	tableName: "category",
})
export class CategoryModel extends Model {
	@Column({
		autoIncrement: true,
		type: DataType.INTEGER,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.INTEGER, allowNull: true })
	@ForeignKey(() => CategoryModel)
	parent_id: number;

	@BelongsTo(() => CategoryModel, { foreignKey: "parent_id" })
	parent: CategoryModel;

	@HasMany(() => CategoryModel, { foreignKey: "parent_id" })
	children: CategoryModel[];

	@Column({ type: DataType.STRING, allowNull: true })
	name: number;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	status: boolean;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
