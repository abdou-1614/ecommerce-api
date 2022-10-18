import { CreateProductsDto } from './dto/create-product.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async CreateProduct(createProduct: CreateProductsDto): Promise<Products> {
        const urlName = this.formatUrlName(createProduct.name)
        const categories = this.connectCategoryByID(createProduct.categories)
        const product = await this.prisma.product.create({
            data: {
                ...createProduct,
                image: createProduct.image.filename,
                urlName,
                categories
            }
        })

        return product
    }

    async findAllProduct({productName = '', page = 1, offset = 10}: FindProductDto): Promise<Products[]> {
        const productToSkip = (page - 1) * offset
        return this.prisma.product.findMany({
            skip: productToSkip,
            take: offset,
            where: {
                name: {contains: productName, mode: 'insensitive'}
            },
            orderBy: {name: 'asc'},
            include: {
                categories: {select: {name: true}}
            }
        })
    }

    /**
     * Find Products By UrlName For Admin
     * 
     */

    async findProduct(id: string): Promise<Products>{
        return this.prisma.product.findUnique({
            where: {id},
            include: {categories: {select: {name: true}}},
            rejectOnNotFound: true
        })
    }

    /**
     * Find Products By UrlName For Users
     * 
     */

    async findProductByUrlName(urlName: string){
        return this.prisma.product.findUnique({
            where: {urlName},
            include: {categories: {select: {name: true}}},
            rejectOnNotFound: true
        })
    }

   /** Formats the name to generate an urlName.
   *
   * Makes the name lower case, remove leading and trailing white spaces,
   * turn to single the multiple spaces between words and make
   * single spaces hyphens
   *
   * @example " SmArT    wAtCh   " becomes "smart-watch"
   */
    private formatUrlName(name: string): string {

        const lowerCaseUrlName = name.toLocaleLowerCase()
        const trimUrlName = lowerCaseUrlName.trim()
        const singleSpaceUrlName = trimUrlName.replace(/\s\s+/g, ' ')
        const spaceToHyphenUrlName  = singleSpaceUrlName.split(' ').join('-')
        return spaceToHyphenUrlName
    }
    /**
   * Format the categories IDs array into the prisma query way
   */

    private connectCategoryByID(categories: string[]): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
        let categoriesConnection = { connect: [] }

        if(categories) {
            categoriesConnection = {
                connect: categories.map(category => {id: category}) 
            }
        }
        return categoriesConnection
    }
}
