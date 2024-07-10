import { Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { GenericController } from "src/common/decorators/controller.decorator";
import { FilterCustomerDto } from "./dto/filter-customers.dto";

@GenericController("customer")
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	async registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
		return await this.customerService.registerCustomer(createCustomerDto);
	}

	@Get()
	async getAllCustomer(@Query() dto: FilterCustomerDto) {
		const customers = this.customerService.getAllCustomer(dto);
		return customers;
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
		return this.customerService.update(+id, updateCustomerDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.customerService.remove(+id);
	}
}
