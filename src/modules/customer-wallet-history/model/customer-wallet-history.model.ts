export class CustomerWallet {}
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
import { CustomerWalletModel } from "src/modules/customer-wallet/model/customer-wallet.model";
import { CustomerWalletHistoryTypes } from "../types/customer-wallet-history.type";

@Table({
	tableName: "customer_wallet_history",
})
export class CustomerWalletHistoryModel extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => CustomerWalletModel)
	wallet_id: number;

	@BelongsTo(() => CustomerWalletModel)
	customer_wallet: CustomerWalletModel;

	@Column({
		type: DataType.INTEGER,
	})
	current_balance: number;

	@Column({
		type: DataType.INTEGER,
	})
	amount: number;

	@Column({
		type: DataType.ENUM(...Object.values(CustomerWalletHistoryTypes)),
	})
	type: string;

	@Column({
		type: DataType.STRING,
	})
	note: string;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
