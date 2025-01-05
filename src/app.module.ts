import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { envSchema } from "./env";

import { Product, ProductSchema } from "./schemas/product.schema";
import { Category, CategorySchema } from "./schemas/category.schema";
import { Order, OrderSchema } from "./schemas/order.schema";

import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

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
	controllers: [ProductController], // Add CategoryController and OrderController
	providers: [ProductService], // Add CategoryService and OrderService
})
export class AppModule {}
