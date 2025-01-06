import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { envSchema } from "./env";

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
	],
	controllers: [
		ProductController,
		CategoryController,
		OrderController,
		DashboardController,
	],
	providers: [ProductService, CategoryService, OrderService, DashboardService],
})
export class AppModule {}
