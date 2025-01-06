import { Handler } from "aws-lambda";
import { MongoClient, ObjectId } from "mongodb";
import * as nodemailer from "nodemailer";

interface OrderEvent {
	orderId: string;
}

interface OrderProduct {
	_id: ObjectId;
	name: string;
	price: number;
}

interface Order {
	_id: ObjectId;
	date: Date;
	productIds: ObjectId[];
	total: number;
	products?: OrderProduct[];
}

const createTransporter = async () => {
	const testAccount = await nodemailer.createTestAccount();

	return nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});
};

const formatEmailContent = (order: Order): string => {
	const productsList =
		order.products
			?.map((product) => {
				const price = product.price ?? 0;
				return `  • ${product.name} - $${price.toFixed(2)}`;
			})
			.join("\n") ?? "  • No products available in this order";

	return `
		Dear Customer,

		Thank you for your order! Here are your order details:

		Order Summary
		------------
		Order ID: ${order._id}
		Order Date: ${new Date(order.date).toLocaleString()}

		Items Purchased:
		${productsList}

		Order Total: $${order.total.toFixed(2)}

		If you have any questions about your order, please contact our supportteam.

		Best regards,
		Order System Team
	`;
};

export const handler: Handler = async (event) => {
	let mongoClient: MongoClient | null = null;

	const body = event.body ? (JSON.parse(event.body) as OrderEvent) : null;

	if (!body?.orderId) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "orderId is required in the request body",
			}),
		};
	}

	try {
		mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
		const db = mongoClient.db(process.env.MONGODB_DATABASE);

		const order = await db.collection<Order>("orders").findOne({
			_id: new ObjectId(body.orderId),
		});

		if (!order) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: "Order not found",
				}),
			};
		}

		const products = await db
			.collection<OrderProduct>("products")
			.find({ _id: { $in: order.productIds } })
			.toArray();

		order.products = products;

		const transporter = await createTransporter();
		const info = await transporter.sendMail({
			from: '"Order System - No Reply" <no-reply@ordersystem.com>',
			to: "7henrique18@gmail.com",
			subject: `Order Confirmation #${order._id}`,
			text: formatEmailContent(order),
		});

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Order notification processed and email sent successfully",
				previewUrl: nodemailer.getTestMessageUrl(info),
			}),
		};
	} catch (error) {
		console.error("Error processing order notification:", error);

		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	} finally {
		if (mongoClient) {
			await mongoClient.close();
		}
	}
};
