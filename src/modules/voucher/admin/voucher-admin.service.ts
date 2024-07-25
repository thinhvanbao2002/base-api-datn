import { Injectable } from "@nestjs/common";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { UpdateVoucherDto } from "../dto/update-voucher.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { VoucherModel } from "../model/voucher.model";

@Injectable()
export class VoucherAdminService {
	constructor(
		@InjectModel(CustomerModel) private readonly customerRepository: typeof CustomerModel,
		@InjectModel(VoucherModel) private readonly voucherRepository: typeof VoucherModel,
	) {}

	async create(createVoucherDto: CreateVoucherDto) {
		const { name, start_time, end_time, discount_percent, customer_id } = createVoucherDto;

		const customers = await this.customerRepository.findAll();

		if (customers.length > 0) {
			const payloadVoucherCustomer = customers.map(c => {
				return {
					name: name,
					start_time: start_time,
					end_time: end_time,
					discount_percent: discount_percent,
					customer_id: c.id,
				};
			});

			await this.voucherRepository.bulkCreate(payloadVoucherCustomer);
		}
	}

	async findAll() {
		return `This action returns all voucher`;
	}

	async findOne(id: number) {
		return `This action returns a #${id} voucher`;
	}

	async update(id: number, updateVoucherDto: UpdateVoucherDto) {
		return `This action updates a #${id} voucher`;
	}

	async remove(id: number) {
		return `This action removes a #${id} voucher`;
	}
}
