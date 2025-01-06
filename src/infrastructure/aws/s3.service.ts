import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
	constructor(
		private readonly s3Client: S3Client,
		private readonly configService: ConfigService,
	) {}

	private getBucketName(): string {
		return this.configService.get<string>("S3_BUCKET_NAME");
	}

	async generatePresignedUrl(key: string): Promise<string> {
		const command = new PutObjectCommand({
			Bucket: this.getBucketName(),
			Key: key,
		});

		return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
	}

	async deleteFile(key: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.getBucketName(),
			Key: key,
		});

		await this.s3Client.send(command);
	}
}
