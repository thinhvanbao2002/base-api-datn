import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerInfoDto } from "./dto/create-customer-info.dto";
import { UpdateCustomerInfoDto } from "./dto/update-customer-info.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerInfoModel } from "./model/customer-info.model";
import { CUSTOMER_INFO_ERR } from "./constants/customer-info.constant";

@Injectable()
export class CustomerInfoService {
	constructor(@InjectModel(CustomerInfoModel) private readonly customerInfoRepository: typeof CustomerInfoModel) {}

	async create(createCustomerInfoDto: CreateCustomerInfoDto, customerId: number) {
		const { phone, address, is_default } = createCustomerInfoDto;

		await this.customerInfoRepository.sequelize.transaction(async transaction => {
			if (is_default === true) {
				await this.customerInfoRepository.update(
					{
						is_default: false,
					},
					{
						where: { customer_id: customerId },
						transaction,
					},
				);
			}

			await this.customerInfoRepository.create(
				{
					customer_id: customerId,
					phone: phone,
					address: address,
				},
				{ transaction },
			);
		});
	}

	async findAll(customerId: number) {
		const customerInfo = await this.customerInfoRepository.findAll({
			where: { customer_id: customerId },
		});
		return customerInfo;
	}

	async findOne(id: number) {
		const foundCustomerInfo = await this.customerInfoRepository.findOne({
			where: { id: id },
		});
		if (!foundCustomerInfo) {
			throw new NotFoundException(CUSTOMER_INFO_ERR.CUSTOMER_INFO_NOT_FOUND);
		}
		return foundCustomerInfo;
	}

	async update(id: number, updateCustomerInfoDto: UpdateCustomerInfoDto, customerId: number) {
		const { phone, address, is_default } = updateCustomerInfoDto;

		const foundCustomerInfo = await this.customerInfoRepository.findOne({
			where: { id: id },
		});
		if (!foundCustomerInfo) {
			throw new NotFoundException(CUSTOMER_INFO_ERR.CUSTOMER_INFO_NOT_FOUND);
		}

		await this.customerInfoRepository.sequelize.transaction(async transaction => {
			if (is_default === true) {
				await this.customerInfoRepository.update(
					{
						is_default: false,
					},
					{
						where: { customer_id: customerId },
						transaction,
					},
				);
			}
			await this.customerInfoRepository.update(
				{
					is_default: is_default,
					phone: phone,
					address: address,
				},
				{
					where: { id: id },
					transaction,
				},
			);
		});
	}

	async remove(id: number) {
		const foundCustomerInfo = await this.customerInfoRepository.findOne({
			where: { id: id },
		});
		if (!foundCustomerInfo) {
			throw new NotFoundException(CUSTOMER_INFO_ERR.CUSTOMER_INFO_NOT_FOUND);
		}
		await this.customerInfoRepository.destroy({
			where: { id: id },
		});
	}
}
