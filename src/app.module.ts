import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { envSchema } from "./env";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { ProductController } from "./infrastructure/http/controllers/product.controller";
import { CategoryController } from "./infrastructure/http/controllers/category.controller";
import { OrderController } from "./infrastructure/http/controllers/order.controller";
import { DashboardController } from "./infrastructure/http/controllers/dashboard.controller";
import { ProductService } from "./domain/services/product.service";
import { ProductSchema } from "./domain/schemas/product.schema";
import { CategoryService } from "./domain/services/category.service";
import { DashboardService } from "./domain/services/dashboard.service";
import { Product } from "./domain/schemas/product.schema";
import { Category, CategorySchema } from "./domain/schemas/category.schema";
import { OrderSchema } from "./domain/schemas/order.schema";
import { Order } from "./domain/schemas/order.schema";
import { OrderService } from "./domain/services/order.service";
import { MongooseCategoryRepository } from "./infrastructure/http/repositories/mongoose/category.repository";
import { MongooseProductRepository } from "./infrastructure/http/repositories/mongoose/product.repository";
import { MongooseOrderRepository } from "./infrastructure/http/repositories/mongoose/order.repository";
import { ProductRepository } from "./domain/repositories/product.repository";
import { CategoryRepository } from "./domain/repositories/category.repository";
import { EventService } from "./infrastructure/events/event.service";
import { OrderCreatedListener } from "./infrastructure/events/order-created.listener";
import { OrderRepository } from "./domain/repositories/order.repository";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: (env) => envSchema.parse(env),
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					uri: configService.get("MONGODB_URI"),
					dbName: configService.get("MONGODB_DATABASE"),
				};
			},
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: Category.name, schema: CategorySchema },
			{ name: Order.name, schema: OrderSchema },
		]),
		EventEmitterModule.forRoot(),
	],
	controllers: [
		ProductController,
		CategoryController,
		OrderController,
		DashboardController,
	],
	providers: [
		{
			provide: "ProductRepository",
			useClass: MongooseProductRepository,
		},
		{
			provide: "OrderRepository",
			useClass: MongooseOrderRepository,
		},
		{
			provide: "CategoryRepository",
			useClass: MongooseCategoryRepository,
		},
		{
			provide: ProductService,
			useFactory: (
				productRepo: ProductRepository,
				categoryRepo: CategoryRepository,
			) => {
				return new ProductService(productRepo, categoryRepo);
			},
			inject: ["ProductRepository", "CategoryRepository"],
		},
		{
			provide: CategoryService,
			useFactory: (
				categoryRepo: CategoryRepository,
				productRepo: ProductRepository,
			) => {
				return new CategoryService(categoryRepo, productRepo);
			},
			inject: ["CategoryRepository", "ProductRepository"],
		},
		OrderService,
		DashboardService,
		EventService,
		OrderCreatedListener,
		{
			provide: OrderService,
			useFactory: (orderRepo: OrderRepository, eventService: EventService) => {
				return new OrderService(orderRepo, eventService);
			},
			inject: ["OrderRepository", EventService],
		},
	],
})
export class AppModule {}
