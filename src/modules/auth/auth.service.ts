import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserModel } from "../user/model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userRepository: typeof UserModel,
		private jwtService: JwtService,
	) {}
	async validateAdmin(email: string, password: string) {
		const foundAmdin = await this.userRepository.findOne({
			where: { email: email },
		});
		if (!foundAmdin) {
			throw new NotFoundException("Tài khoản không tồn tại");
		}

		const checkPass = bcrypt.compareSync(password, foundAmdin.password);

		if (checkPass === false) {
			throw new UnauthorizedException("Sai taì khoản hoặc mật khẩu!");
		}

		const payload = {
			id: foundAmdin.id,
			name: foundAmdin.name,
			role: foundAmdin.role,
		};

		const token = await this.jwtService.signAsync(payload);

		await this.userRepository.update(
			{
				token: token,
			},
			{ where: { id: foundAmdin.id } },
		);

		foundAmdin.token = token;

		return foundAmdin;
	}
}
