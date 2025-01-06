import { z } from "zod";

export const envSchema = z.object({
	MONGODB_URI: z.string().url(),
	MONGODB_DATABASE: z.string().min(1),
	AWS_REGION: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_ENDPOINT: z.string().url(),
	S3_BUCKET_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;
