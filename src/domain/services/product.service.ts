import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Product } from "../schemas/product.schema";
import { Types } from "mongoose";
import { CreateProductDto } from "src/infrastructure/http/dtos/create-product.dto";
import { UpdateProductDto } from "src/infrastructure/http/dtos/update-product.dto";
import { ProductRepository } from "../repositories/product.repository";

@Injectable()
export class ProductService {
	constructor(
		@Inject("ProductRepository")
		private readonly productRepository: ProductRepository,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
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
}
