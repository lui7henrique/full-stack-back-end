import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto";
import { ApiProperty } from "@nestjs/swagger";
import type { Types } from "mongoose";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
	@ApiProperty({ description: "The date of the order", required: false })
	date?: Date;

	@ApiProperty({
		description: "Array of product IDs associated with the order",
		required: false,
	})
	productIds?: Types.ObjectId[];

	@ApiProperty({ description: "Total amount of the order", required: false })
	total?: number;
}
