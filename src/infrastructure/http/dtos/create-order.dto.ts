import { IsArray, IsNumber } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
	@ApiProperty({
		description: "Array of product IDs associated with the order",
	})
	@IsArray()
	productIds: Types.ObjectId[];

	@ApiProperty({ description: "Total amount of the order" })
	@IsNumber()
	total: number;
}
