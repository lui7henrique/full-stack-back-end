import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Category extends Document {
	@ApiProperty({
		description: "The MongoDB generated ID",
		type: String,
		example: "507f1f77bcf86cd799439011",
	})
	_id: Types.ObjectId;

	@ApiProperty({ description: "The name of the category" })
	@Prop({ required: true })
	name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
