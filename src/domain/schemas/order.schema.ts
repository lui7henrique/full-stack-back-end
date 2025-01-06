import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Order extends Document {
	@ApiProperty({
		description: "The MongoDB generated ID",
		type: String,
		example: "507f1f77bcf86cd799439011",
	})
	_id: Types.ObjectId;

	@ApiProperty({ description: "The date when the order was created" })
	@Prop({ required: true, default: Date.now })
	date: Date;

	@ApiProperty({ description: "Array of product IDs in the order" })
	@Prop({ type: [Types.ObjectId], ref: "Product" })
	productIds: Types.ObjectId[];

	@ApiProperty({ description: "Total amount of the order" })
	@Prop({ required: true })
	total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
