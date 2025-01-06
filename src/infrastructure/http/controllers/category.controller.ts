import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";

import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { Category } from "src/domain/schemas/category.schema";
import { CategoryService } from "src/domain/services/category.service";
import { CreateCategoryDto } from "src/infrastructure/http/dtos/create-category.dto";
import { UpdateCategoryDto } from "src/infrastructure/http/dtos/update-category.dto";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiResponse({
		status: 201,
		description: "Category created successfully.",
		type: Category,
	})
	@ApiResponse({
		status: 400,
		description: "Invalid category data provided.",
	})
	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto);
	}

	@ApiResponse({
		status: 200,
		description: "List of categories retrieved successfully.",
		type: [Category],
	})
	@Get()
	findAll() {
		return this.categoryService.findAll();
	}

	@ApiResponse({
		status: 200,
		description: "Category found.",
		type: Category,
	})
	@ApiResponse({
		status: 404,
		description: "Category not found.",
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.categoryService.findOne(id);
	}

	@ApiResponse({
		status: 200,
		description: "Category updated successfully.",
		type: Category,
	})
	@ApiResponse({
		status: 404,
		description: "Category not found.",
	})
	@ApiResponse({
		status: 400,
		description: "Invalid update data provided.",
	})
	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(id, updateCategoryDto);
	}

	@ApiResponse({
		status: 200,
		description: "Category deleted successfully.",
		type: Category,
	})
	@ApiResponse({
		status: 404,
		description: "Category not found.",
	})
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.categoryService.remove(id);
	}
}
