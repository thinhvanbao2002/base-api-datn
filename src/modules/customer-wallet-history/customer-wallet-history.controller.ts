import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { CustomerWalletHistoryService } from "./customer-wallet-history.service";
import { CreateCustomerWalletHistoryDto } from "./dto/create-customer-wallet-history.dto";
import { UpdateCustomerWalletHistoryDto } from "./dto/update-customer-wallet-history.dto";
import { GenericController } from "src/common/decorators/controller.decoretor";

@GenericController("customer-wallet-history")
export class CustomerWalletHistoryController {
	constructor(
		private readonly customerWalletHistoryService: CustomerWalletHistoryService,
	) {}

	@Post()
	create(
		@Body() createCustomerWalletHistoryDto: CreateCustomerWalletHistoryDto,
	) {
		return this.customerWalletHistoryService.create(
			createCustomerWalletHistoryDto,
		);
	}

	@Get()
	findAll() {
		return this.customerWalletHistoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.customerWalletHistoryService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateCustomerWalletHistoryDto: UpdateCustomerWalletHistoryDto,
	) {
		return this.customerWalletHistoryService.update(
			+id,
			updateCustomerWalletHistoryDto,
		);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.customerWalletHistoryService.remove(+id);
	}
}
