import { IsString, IsNumber, IsOptional, IsArray } from "class-validator";
import type { Types } from "mongoose";

export class CreateProductDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsArray()
	categoryIds?: Types.ObjectId[];

	@IsOptional()
	@IsString()
	imageUrl?: string;
}
