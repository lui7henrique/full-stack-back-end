import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";

import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { Types } from "mongoose";
import { OrderService } from "src/domain/services/order.service";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { UpdateOrderDto } from "../dtos/update-order.dto";

@ApiTags("orders")
@Controller("orders")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiResponse({ status: 201, description: "Order created." })
	@Post()
	async create(@Body() createOrderDto: CreateOrderDto) {
		if (createOrderDto.productIds) {
			createOrderDto.productIds = createOrderDto.productIds.map((id) => {
				return new Types.ObjectId(id);
			});
		}

		return this.orderService.create(createOrderDto);
	}

	@ApiResponse({ status: 200, description: "List of orders." })
	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@ApiResponse({ status: 200, description: "Order found." })
	@ApiResponse({ status: 404, description: "Order not found." })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.orderService.findOne(id);
	}

	@ApiResponse({ status: 200, description: "Order updated." })
	@ApiResponse({ status: 404, description: "Order not found." })
	@Put(":id")
	update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update(id, updateOrderDto);
	}

	@ApiResponse({ status: 200, description: "Order deleted." })
	@ApiResponse({ status: 404, description: "Order not found." })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.orderService.remove(id);
	}
}
