import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-category.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	@ApiProperty({ description: "The name of the category", required: false })
	name?: string;

	@ApiProperty({
		description: "A brief description of the category",
		required: false,
	})
	description?: string;
}
