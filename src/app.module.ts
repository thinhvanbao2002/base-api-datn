import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UploadModule } from "./modules/upload/upload.module";
import { UserModule } from "./modules/user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public/uploads"),
		}),
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				dialect: "mysql",
				host: configService.get("DB_HOST"),
				port: +configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_DATABASE"),
				models: [join(process.cwd(), "dist/modules/*.model.js")],
				autoLoadModels: true,
			}),
			inject: [ConfigService],
		}),
		UploadModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
