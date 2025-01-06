import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryRepository } from "src/domain/repositories/category.repository";
import { Category } from "src/domain/schemas/category.schema";

@Injectable()
export class MongooseCategoryRepository implements CategoryRepository {
	constructor(
		@InjectModel(Category.name) private categoryModel: Model<Category>,
	) {}

	async create(category: Partial<Category>): Promise<Category> {
		const createdCategory = new this.categoryModel(category);
		return createdCategory.save();
	}

	async findAll(): Promise<Category[]> {
		return this.categoryModel.find().exec();
	}

	async findById(id: string): Promise<Category | null> {
		return this.categoryModel.findById(id).exec();
	}

	async update(
		id: string,
		category: Partial<Category>,
	): Promise<Category | null> {
		return this.categoryModel
			.findByIdAndUpdate(id, category, { new: true })
			.exec();
	}

	async delete(id: string): Promise<Category | null> {
		return this.categoryModel.findByIdAndDelete(id).exec();
	}
}
