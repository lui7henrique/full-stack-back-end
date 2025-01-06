import {
	Injectable,
	NotFoundException,
	BadRequestException,
	Inject,
} from "@nestjs/common";
import { Product } from "../schemas/product.schema";
import { Types } from "mongoose";
import { CreateProductDto } from "src/infrastructure/http/dtos/create-product.dto";
import { UpdateProductDto } from "src/infrastructure/http/dtos/update-product.dto";
import { ProductRepository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable()
export class ProductService {
	constructor(
		@Inject("ProductRepository")
		private readonly productRepository: ProductRepository,
		@Inject("CategoryRepository")
		private readonly categoryRepository: CategoryRepository,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		if (createProductDto.categoryIds?.length) {
			await this.validateCategoryIds(
				createProductDto.categoryIds.map((id) => id.toString()),
			);
		}
		return this.productRepository.create(createProductDto);
	}

	async findAll(): Promise<Product[]> {
		return this.productRepository.findAll();
	}

	async findOne(id: string): Promise<Product> {
		const product = await this.productRepository.findById(id);

		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return product;
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		if (updateProductDto.categoryIds?.length) {
			await this.validateCategoryIds(
				updateProductDto.categoryIds.map((id) => id.toString()),
			);
		}

		const updatedProduct = await this.productRepository.update(
			id,
			updateProductDto,
		);

		if (!updatedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return updatedProduct;
	}

	async remove(id: string): Promise<Product> {
		const deletedProduct = await this.productRepository.delete(id);

		if (!deletedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return deletedProduct;
	}

	async getProductIdsByCategoryId(
		categoryId: string,
	): Promise<Types.ObjectId[]> {
		return this.productRepository.findByCategoryId(categoryId);
	}

	private async validateCategoryIds(categoryIds: string[]): Promise<void> {
		for (const categoryId of categoryIds) {
			const category = await this.categoryRepository.findById(categoryId);

			if (!category) {
				throw new BadRequestException(
					`Category with ID ${categoryId} does not exist`,
				);
			}
		}
	}
}
