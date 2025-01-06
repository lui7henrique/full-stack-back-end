import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { OrderRepository } from "src/domain/repositories/order.repository";
import { Order } from "src/domain/schemas/order.schema";

type MatchCriteria = {
	date?: {
		$gte?: Date;
		$lte?: Date;
	};
	productIds?: { $in: Types.ObjectId[] };
};

@Injectable()
export class MongooseOrderRepository implements OrderRepository {
	constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

	async create(order: Partial<Order>): Promise<Order> {
		const createdOrder = new this.orderModel(order);
		return createdOrder.save();
	}

	async findAll(): Promise<Order[]> {
		return this.orderModel.find().exec();
	}

	async findById(id: string): Promise<Order | null> {
		return this.orderModel.findById(id).exec();
	}

	async update(id: string, order: Partial<Order>): Promise<Order | null> {
		return this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
	}

	async delete(id: string): Promise<Order | null> {
		return this.orderModel.findByIdAndDelete(id).exec();
	}

	async getMetrics(criteria: {
		startDate?: Date;
		endDate?: Date;
		productIds?: Types.ObjectId[];
	}): Promise<{
		totalOrders: number;
		totalRevenue: number;
		averageOrderValue: number;
	}> {
		const query: MatchCriteria = {};

		if (criteria.startDate || criteria.endDate) {
			query.date = {};

			if (criteria.startDate) query.date.$gte = criteria.startDate;
			if (criteria.endDate) query.date.$lte = criteria.endDate;
		}

		if (criteria.productIds?.length) {
			query.productIds = { $in: criteria.productIds };
		}

		const [result] = await this.orderModel.aggregate([
			{ $match: query },
			{
				$group: {
					_id: null,
					totalOrders: { $sum: 1 },
					totalRevenue: { $sum: "$total" },
					averageOrderValue: { $avg: "$total" },
				},
			},
		]);

		return {
			totalOrders: result?.totalOrders || 0,
			totalRevenue: result?.totalRevenue || 0,
			averageOrderValue: result?.averageOrderValue || 0,
		};
	}
}
