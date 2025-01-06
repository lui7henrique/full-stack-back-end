import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { CategoryController } from "./controllers/category.controller";
import { OrderController } from "./controllers/order.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { ProductService } from "src/domain/services/product.service";
import { CategoryService } from "src/domain/services/category.service";
import { OrderService } from "src/domain/services/order.service";
import { DashboardService } from "src/domain/services/dashboard.service";
import { DatabaseModule } from "../database/database.module";
import { EventModule } from "../events/event.module";
import { AwsModule } from "../aws/aws.module";

@Module({
	imports: [DatabaseModule, EventModule, AwsModule],
	controllers: [
		ProductController,
		CategoryController,
		OrderController,
		DashboardController,
	],
	providers: [ProductService, CategoryService, OrderService, DashboardService],
})
export class HttpModule {}
