import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

@Schema()
export class Order extends Document {
	@Prop({ required: true })
	date: Date;

	@Prop({ type: [Types.ObjectId], ref: "Product" })
	productIds: Types.ObjectId[];

	@Prop({ required: true })
	total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
