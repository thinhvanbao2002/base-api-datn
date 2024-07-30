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

@Table({
	tableName: "voucher",
})
export class VoucherModel extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: string;

	@Column({ type: DataType.STRING, allowNull: true })
	name: string;

	@Column({ type: DataType.INTEGER, allowNull: true })
	@ForeignKey(() => VoucherModel)
	parent_id: number;

	@BelongsTo(() => VoucherModel, { foreignKey: "parent_id" })
	parent: VoucherModel;

	@HasMany(() => VoucherModel, { foreignKey: "parent_id" })
	children: VoucherModel[];

	@Column({ type: DataType.DATE, allowNull: true })
	end_time: Date;

	@Column({ type: DataType.INTEGER, allowNull: true })
	discount_percent: number;

	@Column({ type: DataType.INTEGER, allowNull: true })
	@ForeignKey(() => CustomerModel)
	customer_id: number;

	@BelongsTo(() => CustomerModel)
	customer: CustomerModel;

	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
	status: number;

	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
	is_used: boolean;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
