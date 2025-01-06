import { IsOptional, IsString, Matches } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetDashboardMetricsDto {
	@ApiPropertyOptional({
		description: "Start date for filtering metrics (YYYY-MM-DD format)",
		example: "2025-01-05",
	})
	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: "startDate must be in YYYY-MM-DD format",
	})
	readonly startDate?: string;

	@ApiPropertyOptional({
		description: "End date for filtering metrics (YYYY-MM-DD format)",
		example: "2025-01-06",
	})
	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: "endDate must be in YYYY-MM-DD format",
	})
	readonly endDate?: string;

	@ApiPropertyOptional({
		description: "Category ID for filtering metrics",
	})
	@IsOptional()
	@IsString()
	readonly categoryId?: string;

	@ApiPropertyOptional({
		description: "Product ID for filtering metrics",
	})
	@IsOptional()
	@IsString()
	readonly productId?: string;
}
