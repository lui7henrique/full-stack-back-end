import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { envSchema } from "./env";

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
	],
})
export class AppModule {}
