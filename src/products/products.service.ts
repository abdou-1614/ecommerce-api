import { UpdateProductimage } from './dto/update-image.dto';
import { CreateProductsDto } from './dto/create-product.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { validImageUploadTypes } from 'src/config/multer.config';
import fs from 'fs';

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

    async updateProduct(id: string, updateProduct: UpdateProductDto): Promise<Products> {
        if(updateProduct.name) {
            return this.updateProductAndUrlName(id, updateProduct)
        }
        const categories = this.connectCategoryByID(updateProduct.categories)
        return this.prisma.product.update({
            where: {id},
            data: {
                ...updateProduct,
                categories
            }
        })
    }

    async updateImage(id: string, updateImage: UpdateProductimage): Promise<Products> {
        const product = await this.prisma.product.findUnique({
            where: {id}
        })

        const filePath = this.getPath(product.image)
        fs.unlinkSync(filePath)

        return this.prisma.product.update({
            where: {id},
            data: {
                image: updateImage.image.filename
            }
        })
    }

    async deleteProduct(id: string) {
        const product = await this.prisma.product.delete({
            where: {id}
        })

        if(!product){
            throw new NotFoundException('No Product Found')
        }

        const path = this.getPath(product.image)
        fs.unlinkSync(path)

        return {
            meassge:'Product Deleted Successfully',
            status: HttpStatus.OK
        }
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

    private updateProductAndUrlName(id: string, updateProduct: UpdateProductDto): Promise<Products> {
        const urlName = this.formatUrlName(updateProduct.name)
        const categories = this.connectCategoryByID(updateProduct.categories)
        return this.prisma.product.update({
            where: {id},
            data: {
                ...updateProduct,
                categories,
                urlName
            },
        })
    }
    /**
     * find Path Of Image uploaded For Delted From Folder
     */
    private getPath(image: string) {
        return `${process.cwd()}/tmp/${image}`
    }



    /**
   * Format the categories IDs array into the prisma query way
   */

    private connectCategoryByID(categories: string[]): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
        let categoriesConnection = { connect: [] }

        if(categories) {
            categoriesConnection = {
                connect: categories.map((category) => {
                    return {id: category}
                }) 
            }
        }
        return categoriesConnection
    }
}
