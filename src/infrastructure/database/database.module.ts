import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Product, ProductSchema } from "src/domain/schemas/product.schema";
import { Category, CategorySchema } from "src/domain/schemas/category.schema";
import { Order, OrderSchema } from "src/domain/schemas/order.schema";
import { MongooseProductRepository } from "./repositories/mongoose/product.repository";
import { MongooseOrderRepository } from "./repositories/mongoose/order.repository";
import { MongooseCategoryRepository } from "./repositories/mongoose/category.repository";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get("MONGODB_URI"),
				dbName: configService.get("MONGODB_DATABASE"),
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: Category.name, schema: CategorySchema },
			{ name: Order.name, schema: OrderSchema },
		]),
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
	],
	exports: ["ProductRepository", "OrderRepository", "CategoryRepository"],
})
export class DatabaseModule {}
