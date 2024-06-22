import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { AdminModel } from "../admin/model/admin.model";

@Module({
	imports: [SequelizeModule.forFeature([UserModel, AdminModel])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
