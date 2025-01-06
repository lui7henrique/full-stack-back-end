import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Order } from "../schemas/order.schema";
import { CreateOrderDto } from "src/infrastructure/http/dtos/create-order.dto";
import { UpdateOrderDto } from "src/infrastructure/http/dtos/update-order.dto";
import { OrderRepository } from "../repositories/order.repository";

@Injectable()
export class OrderService {
	constructor(
		@Inject("OrderRepository")
		private readonly orderRepository: OrderRepository,
	) {}

	async create(createOrderDto: CreateOrderDto): Promise<Order> {
		return this.orderRepository.create(createOrderDto);
	}

	async findAll(): Promise<Order[]> {
		return this.orderRepository.findAll();
	}

	async findOne(id: string): Promise<Order> {
		const order = await this.orderRepository.findById(id);
		if (!order) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return order;
	}

	async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
		const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
		if (!updatedOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return updatedOrder;
	}

	async remove(id: string): Promise<Order> {
		const deletedOrder = await this.orderRepository.delete(id);
		if (!deletedOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return deletedOrder;
	}
}