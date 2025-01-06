import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OrderCreatedListener {
	constructor(private configService: ConfigService) {}

	@OnEvent("order.created")
	async handleOrderCreatedEvent(payload: { orderId: string }) {
		try {
			const response = await fetch(
				"http://localhost:3000/dev/notifications/order",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ orderId: payload.orderId }),
				},
			);

			const result = await response.json();
			console.log("Order notification result:", result);
		} catch (error) {
			console.error("Failed to send order notification:", error);
		}
	}
}
