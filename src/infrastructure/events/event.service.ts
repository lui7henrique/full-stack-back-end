import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class EventService {
	constructor(private eventEmitter: EventEmitter2) {}

	emitOrderCreated(orderId: string): void {
		this.eventEmitter.emit("order.created", { orderId });
	}
}
