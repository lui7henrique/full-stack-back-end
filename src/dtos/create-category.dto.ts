import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
	@ApiProperty({ description: "The name of the category" })
	@IsString()
	name: string;

	@ApiProperty({
		description: "A brief description of the category",
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;
}
