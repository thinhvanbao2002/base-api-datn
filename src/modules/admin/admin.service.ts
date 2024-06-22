import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/model/user.model";
import { AdminPageOptionDto } from "./dto/admin-page-option.dto";
import { AdminModel } from "./model/admin.model";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import moment from "moment";
import { ADMIN_ERROR } from "./constants/admin.constant";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(UserModel) private readonly userRepository: typeof UserModel,
		@InjectModel(AdminModel)
		private readonly adminRepository: typeof AdminModel,
	) {}

	async findAll(dto: AdminPageOptionDto): Promise<any> {
		const { q, status, from_date, to_date } = dto;
		const whereOptions: WhereOptions = {};
		if (q) {
			const searchKeyword = `%${q}%`;
			Object.assign(whereOptions, {
				[Op.or]: [
					{ phone: { [Op.like]: searchKeyword } },
					{ name: { [Op.like]: searchKeyword } },
					{ email: { [Op.like]: searchKeyword } },
				],
			});
		}
		if (status) {
			whereOptions.status = { [Op.eq]: status };
		}
		const dateConditions = [];
		if (from_date) {
			dateConditions.push({
				[Op.gte]: moment(from_date).startOf("date").toDate(),
			});
		}
		if (to_date) {
			dateConditions.push({ [Op.lte]: moment(to_date).endOf("date").toDate() });
		}
		if (dateConditions.length > 0) {
			whereOptions.created_at = { [Op.and]: dateConditions };
		}

		const managers = await this.userRepository.findAndCountAll({
			where: whereOptions,
			include: [{ model: AdminModel }],
			order: [["created_at", "DESC"]],
			limit: dto.take,
			offset: dto.skip,
		});
		return new PageDto(
			managers.rows,
			new PageMetaDto({ itemCount: managers.count, pageOptionsDto: dto }),
		);
	}

	async getSingleAdmin(adminId: number): Promise<UserModel> {
		const admin = await this.userRepository.findOne({
			where: { id: adminId },
			include: [{ model: AdminModel }],
		});
		if (!admin) {
			throw new NotFoundException(ADMIN_ERROR.NOT_FOUND);
		}
		return admin;
	}

	async updateAdmin(adminId: number, dto: UpdateAdminDto): Promise<void> {
		await this.getSingleAdmin(adminId);
		await this.userRepository.update({ ...dto }, { where: { id: adminId } });
	}

	async deleteAdmin(adminId: number): Promise<void> {
		await this.getSingleAdmin(adminId);
		await this.userRepository.sequelize.transaction(async transaction => {
			await this.userRepository.destroy({
				where: { id: adminId },
				transaction,
			});
			await this.adminRepository.destroy({
				where: { id: adminId },
				transaction,
			});
		});
	}
}
