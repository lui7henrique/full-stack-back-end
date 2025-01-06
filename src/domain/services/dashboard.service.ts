import { Injectable, Inject } from "@nestjs/common";
import { Types } from "mongoose";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";

@Injectable()
export class DashboardService {
	constructor(
		@Inject("OrderRepository")
		private readonly orderRepository: OrderRepository,
		@Inject("ProductRepository")
		private readonly productRepository: ProductRepository,
	) {}

	async getMetrics(
		startDate?: string,
		endDate?: string,
		categoryId?: string,
		productId?: string,
	): Promise<{ totalOrders: number; totalRevenue: number }> {
		const criteria: {
			startDate?: Date;
			endDate?: Date;
			productIds?: Types.ObjectId[];
		} = {};

		if (startDate) criteria.startDate = new Date(startDate);
		if (endDate) criteria.endDate = new Date(endDate);

		if (categoryId) {
			const productIds =
				await this.productRepository.findByCategoryId(categoryId);
			if (productIds.length === 0) {
				return { totalOrders: 0, totalRevenue: 0 };
			}
			criteria.productIds = productIds;
		}

		if (productId) {
			criteria.productIds = [new Types.ObjectId(productId)];
		}

		return this.orderRepository.getMetrics(criteria);
	}
}
