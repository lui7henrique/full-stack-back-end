import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { Product } from "src/domain/schemas/product.schema";

@Injectable()
export class MongooseProductRepository implements ProductRepository {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
	) {}

	async create(product: Partial<Product>): Promise<Product> {
		const createdProduct = new this.productModel(product);
		return createdProduct.save();
	}

	async findAll(): Promise<Product[]> {
		return this.productModel.find().exec();
	}

	async findById(id: string): Promise<Product | null> {
		return this.productModel.findById(id).exec();
	}

	async update(id: string, product: Partial<Product>): Promise<Product | null> {
		return this.productModel
			.findByIdAndUpdate(id, product, { new: true })
			.exec();
	}

	async delete(id: string): Promise<Product | null> {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async findByCategoryId(categoryId: string): Promise<Types.ObjectId[]> {
		const products = await this.productModel
			.find({ categoryIds: { $in: [new Types.ObjectId(categoryId)] } })
			.exec();

		return products.map((product) => product._id) as Types.ObjectId[];
	}
}
