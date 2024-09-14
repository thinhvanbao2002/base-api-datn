import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({
	tableName: "otp",
})
export class OtpModel extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	phone_number: number;

	@Column({ allowNull: true, type: DataType.STRING })
	otp_code?: string;

	@Column({ allowNull: true, type: DataType.DATE })
	expired_time?: Date;

	@Column({ allowNull: true, type: DataType.INTEGER })
	attempt_remain?: number;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;

	@DeletedAt
	deleted_at: Date;
}
