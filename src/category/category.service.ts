import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from './../prisma/prisma.service';
import {HttpStatus, Injectable} from '@nestjs/common'
import { Category } from './entities/category.entity';
import { FindProductDto } from 'src/products/dto/find-product.dto';

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

    async findAll({categoryName = '', offset = 10, page = 0}: FindCategoryDto): Promise<Category[]> {
        const categoryToSkip = (page - 1) * offset
        return this.prisma.category.findMany({
            skip: categoryToSkip,
            take: offset,
            where: {name: {contains: categoryName, mode: 'insensitive'}},
            orderBy: {name: 'asc'}
        })
    }

    async findOneById(id: string, {productName = '', page = 0, offset = 10}: FindProductDto): Promise<Category> {
        const productToSkip = (page - 1) * offset
        const category = await this.prisma.category.findUnique({
            where: {id},
            include: {
                products: {
                    select: {id: true, name: true, image: true, urlName: true},
                    where: {name: {contains: productName, mode: 'insensitive'}},
                    skip: productToSkip,
                    take: offset
                }
            },
            rejectOnNotFound: true
        })
        return category
    }

    async findOneByName(name: string, {productName = '', page = 0, offset = 10}: FindProductDto): Promise<Category> {
        const productToSkip = (page - 1) * offset
        name = this.capitalizeFirstLatter(name)
        const category = await this.prisma.category.findUnique({
            where: {name},
            include: {
                products: {
                    select: {name: true, id: true, urlName: true, image: true},
                    where: {name: {contains: productName, mode: 'insensitive'}},
                    skip: productToSkip,
                    take: offset
                }
            },
            rejectOnNotFound: true
        })
        return category
    }

    async update(id: string, updateCategory: UpdateCategoryDto): Promise<Category> {
        if(updateCategory.name) {
            return this.updateNameAndCategory(id, updateCategory)
        }

        const category = await this.prisma.category.update({
            where: {id},
            data: {
                ...updateCategory
            }
        })
        return category
    }

    async remove(id: string) {
        await this.prisma.category.delete({
            where: {id}
        })

        return {
            meassge:'Category Deleted Successfully',
            status: HttpStatus.OK
        }
    }

    /** Capitalize only the first letter of the category name */

    private capitalizeFirstLatter(name: string) {
        return name[0].toUpperCase + name.substring(1).toLocaleLowerCase()
    }
   /** Formats name and updates the category with the new one.
   *
   * Used when the user updates the category name.
   */
    private updateNameAndCategory(id: string, updateCategory: UpdateCategoryDto) {
        const name = this.capitalizeFirstLatter(updateCategory.name)

        return this.prisma.category.update({
            where: {id},
            data: {...updateCategory, name}
        })
    }
}