import { NestFactory } from "@nestjs/core";
import { faker } from "@faker-js/faker";
import { AppModule } from "./app.module";
import { Types } from "mongoose";

import { CategoryService } from "./domain/services/category.service";
import { OrderService } from "./domain/services/order.service";
import { ProductService } from "./domain/services/product.service";
import { EventService } from "./infrastructure/events/event.service";

const SEED_CONSTANTS = {
	CATEGORIES: {
		TOTAL: 5,
	},
	PRODUCTS: {
		TOTAL: 10,
		MIN_CATEGORIES: 1,
		MAX_CATEGORIES: 3,
	},
	ORDERS: {
		TOTAL: 25,
		MIN_PRODUCTS: 1,
		MAX_PRODUCTS: 10,
	},
} as const;

async function seed() {
	const app = await NestFactory.createApplicationContext(AppModule);

	const eventService = app.get(EventService);
	const originalEmitOrderCreated = eventService.emitOrderCreated;
	eventService.emitOrderCreated = () => {};

	const categoryService = app.get(CategoryService);
	const productService = app.get(ProductService);
	const orderService = app.get(OrderService);

	try {
		const categories = await Promise.all(
			Array.from({ length: SEED_CONSTANTS.CATEGORIES.TOTAL }, () =>
				categoryService.create({
					name: faker.commerce.department(),
				}),
			),
		);

		const products = await Promise.all(
			Array.from({ length: SEED_CONSTANTS.PRODUCTS.TOTAL }, () =>
				productService.create({
					name: faker.commerce.productName(),
					description: faker.commerce.productDescription(),
					price: Number.parseFloat(faker.commerce.price()),
					categoryIds: faker.helpers.arrayElements(
						categories.map((cat) => cat._id) as Types.ObjectId[],
						faker.number.int({
							min: SEED_CONSTANTS.PRODUCTS.MIN_CATEGORIES,
							max: SEED_CONSTANTS.PRODUCTS.MAX_CATEGORIES,
						}),
					),
					imageUrl: faker.image.url(),
				}),
			),
		);

		await Promise.all(
			Array.from({ length: SEED_CONSTANTS.ORDERS.TOTAL }, () => {
				const selectedProducts = faker.helpers.arrayElements(
					products,
					faker.number.int({
						min: SEED_CONSTANTS.ORDERS.MIN_PRODUCTS,
						max: SEED_CONSTANTS.ORDERS.MAX_PRODUCTS,
					}),
				);

				const total = selectedProducts.reduce(
					(sum, product) => sum + product.price,
					0,
				);

				return orderService.create({
					productIds: selectedProducts.map(
						(product) => product._id,
					) as Types.ObjectId[],
					total,
				});
			}),
		);

		console.log("✅ Seeding completed!");
	} catch (error) {
		console.error("❌ Seeding failed:", error);
	} finally {
		eventService.emitOrderCreated = originalEmitOrderCreated;
		await app.close();
	}
}

seed();
