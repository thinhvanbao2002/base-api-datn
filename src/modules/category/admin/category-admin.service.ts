import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CategoryModel } from "../model/category.model";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CreateChildCategoryDto } from "../dto/create-child-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { SearchCategoryDto } from "../dto/search-category.dto";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { PageDto } from "src/common/dto/page.dto";
import { PageMetaDto } from "src/common/dto/page-meta.dto";

@Injectable()
export class CategoryAdminService {
	constructor(@InjectModel(CategoryModel) private readonly categoryRepository: typeof CategoryModel) {}
	async create(createCategoryDto: CreateCategoryDto): Promise<CategoryModel> {
		const { name } = createCategoryDto;

		return await this.categoryRepository.create({
			name,
		});
	}

	async createChildCategory(createChildCategory: CreateChildCategoryDto): Promise<CategoryModel> {
		const { parent_id, name } = createChildCategory;

		const foundParentId = await this.categoryRepository.findOne({
			where: { id: parent_id },
		});

		if (!foundParentId) {
			throw new NotFoundException("Không tìm thấy danh mục cha");
		}

		return await this.categoryRepository.create({
			parent_id,
			name,
		});
	}

	async findAll(dto: SearchCategoryDto) {
		const { q, status, from_date, to_date, take, skip } = dto;
		const whereOptions: WhereOptions = {};
		const dateConditions = [];
		console.log(q);

		whereOptions.parent_id = { [Op.is]: null };

		if (q) {
			whereOptions.name = { [Op.like]: `%${q}%` };
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

		const categorys = await this.categoryRepository.findAndCountAll({
			where: whereOptions,
			include: [
				{
					model: CategoryModel,
					as: "children",
				},
			],
			limit: take,
			offset: skip,
		});

		return new PageDto(categorys.rows, new PageMetaDto({ itemCount: categorys.count, pageOptionsDto: dto }));
	}

	async findAllChild(dto: SearchCategoryDto) {
		const { q, status, from_date, to_date, take, skip } = dto;
		const whereOptions: WhereOptions = {};
		const dateConditions = [];
		// console.log(q);

		whereOptions.parent_id = { [Op.not]: null };

		// if (q) {
		// 	whereOptions.name = { [Op.like]: `%${q}%` };
		// }

		// if (status) {
		// 	whereOptions.status = { [Op.eq]: status };
		// }

		// if (from_date) {
		// 	dateConditions.push({
		// 		[Op.gte]: from_date,
		// 	});
		// }
		// if (to_date) {
		// 	dateConditions.push({ [Op.lte]: to_date });
		// }
		// if (dateConditions.length > 0) {
		// 	whereOptions.created_at = { [Op.and]: dateConditions };
		// }

		const categorys = await this.categoryRepository.findAndCountAll({
			where: whereOptions,
			include: [
				{
					model: CategoryModel,
					as: "parent",
					where: {
						deleted_at: { [Op.eq]: null },
					},
				},
			],
			limit: dto.take,
			offset: dto.skip,
		});

		return new PageDto(categorys.rows, new PageMetaDto({ itemCount: categorys.count, pageOptionsDto: dto }));
	}

	async findOne(categoryId: number) {
		const foundCategory = await this.categoryRepository.findOne({
			where: { id: categoryId },
		});

		if (!foundCategory) {
			throw new NotFoundException("Không tìm thấy danh mục");
		}

		return foundCategory;
	}

	async update(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<void> {
		const { name, status } = updateCategoryDto;
		const foundCategory = await this.categoryRepository.findOne({
			where: { id: categoryId },
		});

		if (!foundCategory) {
			throw new NotFoundException("Không tìm thấy danh mục");
		}

		await this.categoryRepository.update(
			{
				name,
				status,
			},
			{
				where: { id: categoryId },
			},
		);
	}

	async remove(categoryId: number): Promise<void> {
		const foundCategory = await this.categoryRepository.findOne({
			where: { id: categoryId },
		});

		if (!foundCategory) {
			throw new NotFoundException("Không tìm thấy danh mục");
		}

		await this.categoryRepository.destroy({
			where: { id: categoryId },
		});

		await this.categoryRepository.destroy({
			where: { parent_id: categoryId },
		});
	}
}
