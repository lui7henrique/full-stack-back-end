import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Order } from "../schemas/order.schema";
import { ProductService } from "./product.service";

interface MatchCriteria {
	date?: {
		$gte?: Date;
		$lte?: Date;
	};
	productIds?: { $in: Types.ObjectId[] };
}

@Injectable()
export class DashboardService {
	constructor(
		@InjectModel(Order.name) private orderModel: Model<Order>,
		private productService: ProductService,
	) {}

	async getMetrics(
		startDate?: string,
		endDate?: string,
		categoryId?: string,
		productId?: string,
	): Promise<{ totalOrders: number; totalRevenue: number }> {
		const match: MatchCriteria = {};

		if (startDate || endDate) {
			match.date = {};
			if (startDate) match.date.$gte = new Date(startDate);
			if (endDate) match.date.$lte = new Date(endDate);
		}

		if (categoryId) {
			const productIds =
				await this.productService.getProductIdsByCategoryId(categoryId);

			if (productIds.length === 0) {
				return { totalOrders: 0, totalRevenue: 0 };
			}

			match.productIds = { $in: productIds };
		}

		if (productId) {
			match.productIds = { $in: [new Types.ObjectId(productId)] };
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
