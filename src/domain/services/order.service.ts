import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "../schemas/order.schema";
import { CreateOrderDto } from "src/infrastructure/http/dtos/create-order.dto";
import { UpdateOrderDto } from "src/infrastructure/http/dtos/update-order.dto";

@Injectable()
export class OrderService {
	constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

	async create(createOrderDto: CreateOrderDto): Promise<Order> {
		const createdOrder = new this.orderModel(createOrderDto);
		return createdOrder.save();
	}

	async findAll(): Promise<Order[]> {
		return this.orderModel.find().exec();
	}

	async findOne(id: string): Promise<Order> {
		const order = await this.orderModel.findById(id).exec();
		if (!order) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return order;
	}

	async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
		const updatedOrder = await this.orderModel
			.findByIdAndUpdate(id, updateOrderDto, { new: true })
			.exec();
		if (!updatedOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return updatedOrder;
	}

	async remove(id: string): Promise<Order> {
		const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
		if (!deletedOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return deletedOrder;
	}
}
