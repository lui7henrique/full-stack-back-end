import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "../schemas/order.schema";

@Injectable()
export class DashboardService {
	constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

	async getMetrics(): Promise<{ totalOrders: number; totalRevenue: number }> {
		const totalOrders = await this.orderModel.countDocuments().exec();
		const totalRevenue = await this.orderModel.aggregate([
			{ $group: { _id: null, total: { $sum: "$total" } } },
		]);

		return {
			totalOrders,
			totalRevenue: totalRevenue[0]?.total || 0,
		};
	}
}
