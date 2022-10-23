import { CategoryService } from './category.service';
import { Controller } from "@nestjs/common";


@Controller()
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
}