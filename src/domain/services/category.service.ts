import {
	Injectable,
	NotFoundException,
	Inject,
	BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../schemas/category.schema";
import { CreateCategoryDto } from "src/infrastructure/http/dtos/create-category.dto";
import { UpdateCategoryDto } from "src/infrastructure/http/dtos/update-category.dto";
import { CategoryRepository } from "../repositories/category.repository";
import { ProductRepository } from "../repositories/product.repository";

@Injectable()
export class CategoryService {
	constructor(
		@Inject("CategoryRepository")
		private readonly categoryRepository: CategoryRepository,
		@Inject("ProductRepository")
		private readonly productRepository: ProductRepository,
	) {}

	async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
		return this.categoryRepository.create(createCategoryDto);
	}

	async findAll(): Promise<Category[]> {
		return this.categoryRepository.findAll();
	}

	async findOne(id: string): Promise<Category> {
		const category = await this.categoryRepository.findById(id);

		if (!category) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}

		return category;
	}

	async update(
		id: string,
		updateCategoryDto: UpdateCategoryDto,
	): Promise<Category> {
		const updatedCategory = await this.categoryRepository.update(
			id,
			updateCategoryDto,
		);

		if (!updatedCategory) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}

		return updatedCategory;
	}

	async remove(id: string): Promise<Category> {
		const productsWithCategory =
			await this.productRepository.findByCategoryId(id);

		if (productsWithCategory.length > 0) {
			for (const productId of productsWithCategory) {
				const product = await this.productRepository.findById(
					productId.toString(),
				);

				if (product) {
					const updatedCategoryIds = product.categoryIds.filter(
						(catId) => catId.toString() !== id,
					);

					await this.productRepository.update(productId.toString(), {
						categoryIds: updatedCategoryIds,
					});
				}
			}
		}

		const deletedCategory = await this.categoryRepository.delete(id);

		if (!deletedCategory) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}

		return deletedCategory;
	}
}
