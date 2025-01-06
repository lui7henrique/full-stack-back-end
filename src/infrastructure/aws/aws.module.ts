import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { S3Client } from "@aws-sdk/client-s3";
import { S3Service } from "./s3.service";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: S3Client,
			useFactory: (configService: ConfigService) => {
				return new S3Client({
					region: configService.get("AWS_REGION"),
					credentials: {
						accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
						secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
					},
					endpoint: configService.get("AWS_ENDPOINT"),
					forcePathStyle: true,
				});
			},
			inject: [ConfigService],
		},
		S3Service,
	],
	exports: [S3Client, S3Service],
})
export class AwsModule {}
