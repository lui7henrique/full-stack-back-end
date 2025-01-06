import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, ObjectId } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Product extends Document {
	@ApiProperty({
		description: "The MongoDB generated ID",
		type: String,
		example: "507f1f77bcf86cd799439011",
	})
	_id: Types.ObjectId;

	@ApiProperty({ description: "The name of the product" })
	@Prop({ required: true })
	name: string;

	@ApiProperty({ description: "A brief description of the product" })
	@Prop()
	description: string;

	@ApiProperty({ description: "The price of the product" })
	@Prop({ required: true })
	price: number;

	@ApiProperty({
		description: "Array of category IDs associated with the product",
	})
	@Prop({ type: [Types.ObjectId], ref: "Category" })
	categoryIds: Types.ObjectId[];

	@ApiProperty({ description: "URL of the product image" })
	@Prop({ default: null })
	imageUrl: string | null;

	@ApiProperty({ description: "Version key used by MongoDB" })
	__v: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
