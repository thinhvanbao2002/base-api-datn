import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/model/user.model";
import { AdminPageOptionDto } from "./dto/admin-page-option.dto";
import { AdminModel } from "./model/admin.model";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { ADMIN_ERROR } from "./constants/admin.constant";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { UserRoles } from "../user/types/user.type";

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(UserModel) private readonly userRepository: typeof UserModel,
		@InjectModel(AdminModel)
		private readonly adminRepository: typeof AdminModel,
	) {}

	async findAll(dto: AdminPageOptionDto) {
		const { q, status, from_date, to_date } = dto;
		const dateConditions = [];

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

		whereOptions.role = { [Op.or]: [UserRoles.ADMIN, UserRoles.STAFF] };

		const managers = await this.userRepository.findAndCountAll({
			where: whereOptions,
			include: [{ model: AdminModel }],
			order: [["created_at", "DESC"]],
			limit: dto.take,
			offset: dto.skip,
		});
		return new PageDto(managers.rows, new PageMetaDto({ itemCount: managers.count, pageOptionsDto: dto }));
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
