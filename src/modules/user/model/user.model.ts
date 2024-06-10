import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({
	tableName: "user",
})
export class UserModel extends Model {
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
	full_name: string;
}
