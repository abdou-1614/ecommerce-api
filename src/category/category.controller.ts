import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';

@ApiTags('Category')
@Controller()
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({summary: 'Admin Create Category'})
    @ApiCreatedResponse({type: Category})
    @isAdmin()
    @Post()
    async create(@Body() create: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(create)
    }
}