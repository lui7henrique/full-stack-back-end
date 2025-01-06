import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Order } from "../schemas/order.schema";
import { CreateOrderDto } from "src/infrastructure/http/dtos/create-order.dto";
import { UpdateOrderDto } from "src/infrastructure/http/dtos/update-order.dto";
import { OrderRepository } from "../repositories/order.repository";
import { EventService } from "src/infrastructure/events/event.service";

@Injectable()
export class OrderService {
	constructor(
		@Inject("OrderRepository")
		private readonly orderRepository: OrderRepository,
		private readonly eventService: EventService,
	) {}

	async create(createOrderDto: CreateOrderDto): Promise<Order> {
		const order = await this.orderRepository.create(createOrderDto);
		this.eventService.emitOrderCreated(order._id.toString());
		return order;
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
