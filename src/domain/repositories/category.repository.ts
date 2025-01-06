import { Category } from "../schemas/category.schema";

export interface CategoryRepository {
	create(category: Partial<Category>): Promise<Category>;
	findAll(): Promise<Category[]>;
	findById(id: string): Promise<Category | null>;
	update(id: string, category: Partial<Category>): Promise<Category | null>;
	delete(id: string): Promise<Category | null>;
}
