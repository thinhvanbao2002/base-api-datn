export class CustomerWallet {}
import {
	Column,
	CreatedAt,
	DataType,
	DeletedAt,
	Model,
	Table,
	UpdatedAt,
} from "sequelize-typescript";

@Table({
	tableName: "customer_wallet",
})
export class CustomerWalletModel extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	balance: number;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	status: boolean;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
