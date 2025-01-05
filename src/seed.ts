import { NestFactory } from "@nestjs/core";
import { faker } from "@faker-js/faker";
import { AppModule } from "./app.module";
import { CategoryService } from "./services/category.service";
import { ProductService } from "./services/product.service";
import { OrderService } from "./services/order.service";
import { Types } from "mongoose";

async function seed() {
	const app = await NestFactory.createApplicationContext(AppModule);

	const categoryService = app.get(CategoryService);
	const productService = app.get(ProductService);
	const orderService = app.get(OrderService);

	try {
		const categories = await Promise.all(
			Array.from({ length: 10 }, () =>
				categoryService.create({
					name: faker.commerce.department(),
					description: faker.commerce.productDescription(),
				}),
			),
		);

		const products = await Promise.all(
			Array.from({ length: 50 }, () =>
				productService.create({
					name: faker.commerce.productName(),
					description: faker.commerce.productDescription(),
					price: Number.parseFloat(faker.commerce.price()),
					categoryIds: faker.helpers.arrayElements(
						categories.map((cat) => cat._id) as Types.ObjectId[],
						faker.number.int({ min: 1, max: 3 }),
					),
					imageUrl: faker.image.url(),
				}),
			),
		);

		await Promise.all(
			Array.from({ length: 100 }, () => {
				const selectedProducts = faker.helpers.arrayElements(
					products,
					faker.number.int({ min: 1, max: 5 }),
				);
				const total = selectedProducts.reduce(
					(sum, product) => sum + product.price,
					0,
				);

				return orderService.create({
					date: faker.date.past(),
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
		await app.close();
	}
}

seed();
