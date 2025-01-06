import {
	IsString,
	IsNumber,
	IsOptional,
	IsArray,
	IsPositive,
} from "class-validator";
import type { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
	@ApiProperty({ description: "The name of the product" })
	@IsString()
	name: string;

	@ApiProperty({
		description: "A brief description of the product",
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ description: "The price of the product" })
	@IsNumber()
	@IsPositive()
	price: number;

	@ApiProperty({
		description: "Array of category IDs associated with the product",
		required: false,
	})
	@IsOptional()
	@IsArray()
	categoryIds?: Types.ObjectId[];

	@ApiProperty({ description: "URL of the product image", required: false })
	@IsOptional()
	@IsString()
	imageUrl?: string;
}
