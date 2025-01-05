import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../schemas/product.schema";
import type { Model } from "mongoose";
import type { CreateProductDto } from "../dtos/create-product.dto";
import type { UpdateProductDto } from "../dtos/update-product.dto";

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		const createdProduct = new this.productModel(createProductDto);
		return createdProduct.save();
	}

	async findAll(): Promise<Product[]> {
		return this.productModel.find().exec();
	}

	async findOne(id: string): Promise<Product> {
		const product = await this.productModel.findById(id).exec();
		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		return product;
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		const updatedProduct = await this.productModel
			.findByIdAndUpdate(id, updateProductDto, { new: true })
			.exec();

		if (!updatedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return updatedProduct;
	}

	async remove(id: string): Promise<Product> {
		const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

		if (!deletedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return deletedProduct;
	}
}
