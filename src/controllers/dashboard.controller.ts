import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "../services/dashboard.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("dashboard")
@Controller("dashboard")
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@ApiResponse({ status: 200, description: "Dashboard metrics retrieved." })
	@Get("metrics")
	async getMetrics() {
		return this.dashboardService.getMetrics();
	}
}
