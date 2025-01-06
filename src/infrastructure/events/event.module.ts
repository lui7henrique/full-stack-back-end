import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EventService } from "./event.service";
import { OrderCreatedListener } from "./order-created.listener";

@Module({
	imports: [EventEmitterModule.forRoot()],
	providers: [EventService, OrderCreatedListener],
	exports: [EventService],
})
export class EventModule {}
