import { Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPayloadDto } from "./dto/auth.dto";
import { GenericController } from "src/common/decorators/controller.decoretor";

@GenericController("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	create(@Body() authPayload: AuthPayloadDto) {
		const { email, password } = authPayload;
		console.log(authPayload);
		return this.authService.validateAdmin(email, password);
	}
}
