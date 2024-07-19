import { EnumFieldOptional, StringField, StringFieldOptional } from "src/common/decorators/field.decorator";
import { UserStatus } from "src/modules/user/types/user.type";

export class UpdateCustomerDto {
	@StringField()
	name: string;

	@StringFieldOptional()
	avatar?: string;

	@EnumFieldOptional(() => UserStatus)
	status?: UserStatus;
}
