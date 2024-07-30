import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { UpdateVoucherDto } from "../dto/update-voucher.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerModel } from "src/modules/customer/model/customer.model";
import { VoucherModel } from "../model/voucher.model";
import { FilterVoucherDto } from "../dto/filter-voucher.dto";
import { where, WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";

@Injectable()
export class VoucherAdminService {
	constructor(
		@InjectModel(CustomerModel) private readonly customerRepository: typeof CustomerModel,
		@InjectModel(VoucherModel) private readonly voucherRepository: typeof VoucherModel,
	) {}

	async create(createVoucherDto: CreateVoucherDto) {
		const { name, end_time, discount_percent } = createVoucherDto;

		const customers = await this.customerRepository.findAll();

		if (customers.length > 0) {
			await this.voucherRepository.sequelize.transaction(async transaction => {
				const voucherAdmin = await this.voucherRepository.create(
					{
						name,
						end_time,
						discount_percent,
					},
					{ transaction },
				);

				const payloadVoucherCustomer = customers.map(c => {
					return {
						name: name,
						parent_id: voucherAdmin.id,
						end_time: end_time,
						discount_percent: discount_percent,
						customer_id: c.id,
					};
				});

				await this.voucherRepository.bulkCreate(payloadVoucherCustomer, { transaction });
			});
		}
	}

	async findAll(dto: FilterVoucherDto) {
		const { name, from_date, to_date, take, skip } = dto;

		const whereOptions: WhereOptions = {};
		const dateConditions = [];

		whereOptions.parent_id = { [Op.eq]: null };

		if (name) {
			whereOptions.name = { [Op.like]: `%${name}%` };
		}

		if (from_date) {
			dateConditions.push({
				[Op.gte]: from_date,
			});
		}
		if (to_date) {
			dateConditions.push({ [Op.lte]: to_date });
		}
		if (dateConditions.length > 0) {
			whereOptions.created_at = { [Op.and]: dateConditions };
		}

		const vouchers = await this.voucherRepository.findAndCountAll({
			where: whereOptions,
			order: [["created_at", "desc"]],
			limit: take,
			offset: skip,
		});

		return new PageDto(vouchers.rows, new PageMetaDto({ itemCount: vouchers.count, pageOptionsDto: dto }));
	}

	async findOne(voucherId: number) {
		const foundVoucher = await this.voucherRepository.findOne({
			where: { id: voucherId },
		});

		if (!foundVoucher) {
			throw new NotFoundException("Mã giảm giá không tồn tại!");
		}

		return foundVoucher;
	}

	async update(id: number, updateVoucherDto: UpdateVoucherDto) {
		const { name, end_time, discount_percent } = updateVoucherDto;
		const foundVoucher = await this.voucherRepository.findOne({
			where: { id: id },
		});

		if (!foundVoucher) {
			throw new NotFoundException("Không tồn tại mã giảm giá!");
		}

		await this.voucherRepository.update(
			{
				name,
				end_time,
				discount_percent,
			},
			{
				where: { id: id },
			},
		);
	}

	async remove(id: number) {
		const foundVoucher = await this.voucherRepository.findOne({
			where: { id: id },
		});

		if (!foundVoucher) {
			throw new NotFoundException("Không tồn tại mã giảm giá!");
		}

		await this.voucherRepository.sequelize.transaction(async transaction => {
			await this.voucherRepository.destroy({
				where: { id: id },
				transaction,
			});

			await this.voucherRepository.destroy({
				where: { parent_id: id },
				transaction,
			});
		});
	}
}
