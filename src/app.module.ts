import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { HttpModule } from "./infrastructure/http/http.module";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { EventModule } from "./infrastructure/events/event.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: (env) => envSchema.parse(env),
		}),
		HttpModule,
		DatabaseModule,
		EventModule,
	],
})
export class AppModule {}
