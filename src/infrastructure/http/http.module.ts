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
import { EventService } from "../events/event.service";

@Module({
	imports: [DatabaseModule, EventModule],
	controllers: [
		ProductController,
		CategoryController,
		OrderController,
		DashboardController,
	],
	providers: [
		{
			provide: ProductService,
			useFactory: (productRepo, categoryRepo) => {
				return new ProductService(productRepo, categoryRepo);
			},
			inject: ["ProductRepository", "CategoryRepository"],
		},
		{
			provide: CategoryService,
			useFactory: (categoryRepo, productRepo) => {
				return new CategoryService(categoryRepo, productRepo);
			},
			inject: ["CategoryRepository", "ProductRepository"],
		},
		{
			provide: OrderService,
			useFactory: (orderRepo, eventService) => {
				return new OrderService(orderRepo, eventService);
			},
			inject: ["OrderRepository", EventService],
		},
		DashboardService,
	],
})
export class HttpModule {}
