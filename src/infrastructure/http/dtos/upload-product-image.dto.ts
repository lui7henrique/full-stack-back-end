import { ApiProperty } from "@nestjs/swagger";

export class UploadProductImageDto {
	@ApiProperty({
		type: "string",
		format: "binary",
		description: "The image file to upload",
		required: true,
	})
	file: Express.Multer.File;
}
