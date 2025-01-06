import { Order } from "../schemas/order.schema";
import { Types } from "mongoose";

export interface OrderRepository {
	create(order: Partial<Order>): Promise<Order>;
	findAll(): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
	update(id: string, order: Partial<Order>): Promise<Order | null>;
	delete(id: string): Promise<Order | null>;
	getMetrics(criteria: {
		startDate?: Date;
		endDate?: Date;
		productIds?: Types.ObjectId[];
	}): Promise<{ totalOrders: number; totalRevenue: number }>;
}
