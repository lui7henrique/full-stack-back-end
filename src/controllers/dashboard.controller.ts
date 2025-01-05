import { Controller, Get, Query } from "@nestjs/common";
import { DashboardService } from "../services/dashboard.service";
import { ApiTags, ApiResponse, ApiQuery } from "@nestjs/swagger";

@ApiTags("dashboard")
@Controller("dashboard")
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@ApiResponse({ status: 200, description: "Dashboard metrics retrieved." })
	@Get("metrics")
	@ApiQuery({ name: "startDate", required: false, type: String })
	@ApiQuery({ name: "endDate", required: false, type: String })
	@ApiQuery({ name: "categoryId", required: false, type: String })
	@ApiQuery({ name: "productId", required: false, type: String })
	async getMetrics(
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
		@Query("categoryId") categoryId?: string,
		@Query("productId") productId?: string,
	) {
		return this.dashboardService.getMetrics(
			startDate,
			endDate,
			categoryId,
			productId,
		);
	}
}
