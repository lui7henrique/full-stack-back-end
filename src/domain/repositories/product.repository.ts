import { Product } from "../schemas/product.schema";
import { Types } from "mongoose";

export interface ProductRepository {
	create(product: Partial<Product>): Promise<Product>;
	findAll(): Promise<Product[]>;
	findById(id: string): Promise<Product | null>;
	update(id: string, product: Partial<Product>): Promise<Product | null>;
	delete(id: string): Promise<Product | null>;
	findByCategoryId(categoryId: string): Promise<Types.ObjectId[]>;
}
