import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { setupSwagger } from "./bootstrap/setup-swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const config = new DocumentBuilder()
		.setTitle("###")
		.setDescription(
			`### REST

				Routes is following REST standard (Richardson level 3)

				<details><summary>Detailed specification</summary>
				<p>

				</p>
			</details>`,
		)
		.addBearerAuth(
			{
				type: "http",
				name: "userAuth",
				description: "Token for user access",
				bearerFormat: "JWT",
				scheme: "bearer",
				in: "header",
			},
			"userAuth",
		)
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	setupSwagger(app);
	await app.listen(3009);
}
bootstrap();
