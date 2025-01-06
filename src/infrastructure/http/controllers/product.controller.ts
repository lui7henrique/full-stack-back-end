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
import { Types } from "mongoose";
import { ProductService } from "src/domain/services/product.service";
import { CreateProductDto } from "src/infrastructure/http/dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { Product } from "src/domain/schemas/product.schema";

@ApiTags("products")
@Controller("products")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiResponse({ status: 201, description: "Product created." })
	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		if (createProductDto.categoryIds) {
			createProductDto.categoryIds = createProductDto.categoryIds.map(
				(id) => new Types.ObjectId(id),
			);
		}

		return this.productService.create(createProductDto);
	}

	@ApiResponse({ status: 200, description: "List of products." })
	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@ApiResponse({ status: 200, description: "Product found." })
	@ApiResponse({ status: 404, description: "Product not found." })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.productService.findOne(id);
	}

	@ApiResponse({ status: 200, description: "Product updated." })
	@ApiResponse({ status: 404, description: "Product not found." })
	@Put(":id")
	update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(id, updateProductDto);
	}

	@ApiResponse({ status: 200, description: "Product deleted." })
	@ApiResponse({ status: 404, description: "Product not found." })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productService.remove(id);
	}
}