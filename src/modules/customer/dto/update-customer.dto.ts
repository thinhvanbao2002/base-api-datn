import {
	DateFieldOptional,
	EmailFieldOptional,
	EnumFieldOptional,
	StringField,
	StringFieldOptional,
} from "src/common/decorators/field.decorator";
import { UserStatus } from "src/modules/user/types/user.type";

export class UpdateCustomerDto {
	@StringField()
	name: string;

	@StringFieldOptional()
	phone?: string;

	@EmailFieldOptional()
	email?: string;

	@StringFieldOptional()
	avatar?: string;

	@DateFieldOptional()
	birth_day?: Date;

	@StringFieldOptional()
	address?: string;

	@EnumFieldOptional(() => UserStatus)
	status?: UserStatus;
}
