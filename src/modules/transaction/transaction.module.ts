import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { TransactionModel } from "./model/transaction.model";

@Module({
	imports: [SequelizeModule.forFeature([TransactionModel])],
	controllers: [TransactionController],
	providers: [TransactionService],
})
export class TransactionModule {}
