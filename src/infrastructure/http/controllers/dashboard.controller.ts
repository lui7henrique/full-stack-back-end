import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { DashboardService } from "src/domain/services/dashboard.service";
import { GetDashboardMetricsDto } from "../dtos/get-dashboard-metrics.dto";

@ApiTags("dashboard")
@Controller("dashboard")
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@ApiResponse({
		status: 200,
		description: "Dashboard metrics retrieved successfully.",
		schema: {
			type: "object",
			properties: {
				totalOrders: {
					type: "number",
					description: "Total number of orders",
				},
				totalRevenue: {
					type: "number",
					description: "Total revenue from orders",
				},
			},
		},
	})
	@ApiResponse({
		status: 400,
		description: "Invalid query parameters provided.",
	})
	@Get("metrics")
	async getMetrics(@Query() query: GetDashboardMetricsDto) {
		return this.dashboardService.getMetrics(
			query.startDate,
			query.endDate,
			query.categoryId,
			query.productId,
		);
	}
}
