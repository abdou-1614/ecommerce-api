import { FindProductDto } from './../products/dto/find-product.dto';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';
import { FindCategoryDto } from './dto/find-category.dto';
import { Public } from 'src/auth/public.decorator';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({summary: 'Admin Create Category'})
    @ApiCreatedResponse({type: Category})
    @isAdmin()
    @Post()
    async create(@Body() create: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(create)
    }

    @ApiOperation({summary: 'Return All Products', description: 'Returns all categories with pagination'})
    @ApiOkResponse({type: Category})
    @Public()
    @Get()
    async findAllCategory(@Query() findCategory: FindCategoryDto): Promise<Category[]> {
        return this.categoryService.findAll(findCategory)
    }

    @ApiOperation({summary: 'Get Categories And Products Have This Category', description: 'Find category by ID, only for admins'})
    @ApiOkResponse({type: Category})
    @isAdmin()
    @Get('/id/:id')
    async findById(@Param('id') id: string, @Query() findProducts: FindProductDto) {
        return this.categoryService.findOneById(id, findProducts)
    }
    @ApiOperation({summary: 'Find Category And Its Products', description: 'Find category by name'})
    @ApiOkResponse({type: Category})
    @Public()
    @Get('/name/:name')
    async findByName(@Param('name') name: string, @Query() findProduct: FindProductDto) {
        return this.categoryService.findOneByName(name, findProduct)
    }
}