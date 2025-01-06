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
	}): Promise<{ totalOrders: number; totalRevenue: number }> {
		const match: MatchCriteria = {};

		if (criteria.startDate || criteria.endDate) {
			match.date = {};

			if (criteria.startDate) match.date.$gte = criteria.startDate;
			if (criteria.endDate) match.date.$lte = criteria.endDate;
		}

		if (criteria.productIds?.length) {
			match.productIds = { $in: criteria.productIds };
		}

		const totalOrders = await this.orderModel.countDocuments(match).exec();
		const totalRevenue = await this.orderModel.aggregate([
			{ $match: match },
			{ $group: { _id: null, total: { $sum: "$total" } } },
		]);

		return {
			totalOrders,
			totalRevenue: totalRevenue[0]?.total || 0,
		};
	}
}
