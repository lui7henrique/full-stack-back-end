import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";
import type { ProductService } from "../services/product.service";

import type { CreateProductDto } from "../dtos/create-product.dto";
import type { UpdateProductDto } from "../dtos/update-product.dto";

@Controller("products")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.productService.findOne(id);
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(id, updateProductDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productService.remove(id);
	}
}
