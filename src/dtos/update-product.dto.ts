import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@ApiProperty({ description: "The name of the product", required: false })
	name?: string;

	@ApiProperty({
		description: "A brief description of the product",
		required: false,
	})
	description?: string;

	@ApiProperty({ description: "The price of the product", required: false })
	price?: number;

	@ApiProperty({
		description: "Array of category IDs associated with the product",
		required: false,
	})
	categoryIds?: Types.ObjectId[];

	@ApiProperty({ description: "URL of the product image", required: false })
	imageUrl?: string;
}
