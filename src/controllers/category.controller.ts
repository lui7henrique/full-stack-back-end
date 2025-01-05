import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiResponse({ status: 201, description: "Category created." })
	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto);
	}

	@ApiResponse({ status: 200, description: "List of categories." })
	@Get()
	findAll() {
		return this.categoryService.findAll();
	}

	@ApiResponse({ status: 200, description: "Category found." })
	@ApiResponse({ status: 404, description: "Category not found." })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.categoryService.findOne(id);
	}

	@ApiResponse({ status: 200, description: "Category updated." })
	@ApiResponse({ status: 404, description: "Category not found." })
	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(id, updateCategoryDto);
	}

	@ApiResponse({ status: 200, description: "Category deleted." })
	@ApiResponse({ status: 404, description: "Category not found." })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.categoryService.remove(id);
	}
}
