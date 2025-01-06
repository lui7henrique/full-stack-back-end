import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";

import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { Types } from "mongoose";
import { OrderService } from "src/domain/services/order.service";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { Order } from "src/domain/schemas/order.schema";

@ApiTags("orders")
@Controller("orders")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiOperation({ operationId: "createOrder" })
	@ApiResponse({
		status: 201,
		description: "Order created successfully.",
		type: Order,
	})
	@ApiResponse({
		status: 400,
		description: "Invalid order data provided.",
	})
	@Post()
	async create(@Body() createOrderDto: CreateOrderDto) {
		if (createOrderDto.productIds) {
			createOrderDto.productIds = createOrderDto.productIds.map((id) => {
				return new Types.ObjectId(id);
			});
		}

		return this.orderService.create(createOrderDto);
	}

	@ApiOperation({ operationId: "getOrders" })
	@ApiResponse({
		status: 200,
		description: "List of orders retrieved successfully.",
		type: [Order],
	})
	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@ApiOperation({ operationId: "getOrder" })
	@ApiResponse({
		status: 200,
		description: "Order found.",
		type: Order,
	})
	@ApiResponse({
		status: 404,
		description: "Order not found.",
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.orderService.findOne(id);
	}

	@ApiOperation({ operationId: "updateOrder" })
	@ApiResponse({
		status: 200,
		description: "Order updated successfully.",
		type: Order,
	})
	@ApiResponse({
		status: 404,
		description: "Order not found.",
	})
	@ApiResponse({
		status: 400,
		description: "Invalid update data provided.",
	})
	@Put(":id")
	update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update(id, updateOrderDto);
	}

	@ApiOperation({ operationId: "deleteOrder" })
	@ApiResponse({
		status: 200,
		description: "Order deleted successfully.",
		type: Order,
	})
	@ApiResponse({
		status: 404,
		description: "Order not found.",
	})
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.orderService.remove(id);
	}
}
