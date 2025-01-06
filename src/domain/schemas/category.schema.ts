import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Category extends Document {
	@ApiProperty({ description: "The name of the category" })
	@Prop({ required: true })
	name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
