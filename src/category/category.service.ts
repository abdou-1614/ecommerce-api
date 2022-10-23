import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from './../prisma/prisma.service';
import {Injectable} from '@nestjs/common'
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async createCategory(createCategort: CreateCategoryDto): Promise<Category> {
        const name = this.capitalizeFirstLatter(createCategort.name)
        const category = await this.prisma.category.create({
            data: {
                ...createCategort,
                name
            }
        })
        return category
    }

    /** Capitalize only the first letter of the category name */

    private capitalizeFirstLatter(name: string) {
        return name[0].toUpperCase + name.substring(1).toLocaleLowerCase()
    }
}