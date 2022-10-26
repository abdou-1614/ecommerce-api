import { Role } from '@prisma/client';
import { FindPurchaseDto } from './dto/find-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from './../prisma/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import currency from 'currency.js';
import { Purchase } from './entities/purchase.entity';
import { NotOwnerPurchase } from './exceptions/purchase-owner.exception';
import { ReviewDto } from './dto/review-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchaseService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string, creatPurchase: CreatePurchaseDto): Promise<Purchase> {
        const totalPrice = await this.calculateTotalPrice(creatPurchase)

        const purchase = await this.prisma.purchase.create({
            data: {
                ...creatPurchase,
                totalPrice,
                userId,
            },
            include: {
                user: {select: {name: true}},
                product: {select: {name: true}}
            }
        })
        return purchase
    }

    async findPurchase({userId, productId, page = 1, offset = 10}:FindPurchaseDto): Promise<Purchase[]> {
        const purchaseToSkip = (page - 1) * offset

        const purchases = await this.prisma.purchase.findMany({
            skip: purchaseToSkip,
            take: offset,
            where: {
                userId: {equals: userId},
                productId: {equals: productId}
            },
            orderBy: {createdAt: 'desc'},
            include: {
                user: {select: {name: true}},
                product: {select: {name: true}}
            }
        })

        return purchases
    }

    async findOne(purchaseId: string, userId: string, userRole: string): Promise<Purchase> {
        const purchase = await this.prisma.purchase.findUnique({
            where: {id: purchaseId},
            include: {
                user: {select: {name: true}},
                product: {select: {name: true}}
            },
            rejectOnNotFound: true
        })

        if(userRole !== Role.ADMIN && userId !== purchase.userId) {
            throw new NotOwnerPurchase()
        }

        return purchase
    }

    async review(purchaseId: string, userId: string, reviewDto: ReviewDto):Promise<Purchase> {
        const purchase = await this.prisma.purchase.findUnique({
            where: {id: purchaseId},
            rejectOnNotFound: true
        })

        if(userId !== purchase.userId) {
            throw new NotOwnerPurchase()
        }

        return this.prisma.purchase.update({
            where : {id: purchaseId},
            data: {
                ...reviewDto,
            },
            include: {
                user: {select: {name: true}},
                product: {select: {name: true}}
            }
        })
    }

    async update(id: string, updatePurchase: UpdatePurchaseDto): Promise<Purchase> {
        const purchase = await this.prisma.purchase.findUnique({
            where: {id}
        })

        const productId = updatePurchase.productId || purchase.productId
        const amount = updatePurchase.amount || purchase.amount
        const totalPrice = await this.calculateTotalPrice({productId, amount})

        return this.prisma.purchase.update({
            where: {id},
            data: {
                ...updatePurchase,
                totalPrice
            },
            include: {
                user: {select: {name: true}},
                product: {select: {name: true}}
            }
        })
    }

    async delete(id: string) {
        await this.prisma.purchase.delete({
            where: {id}
        })

        return {
            message: 'Purchase Deleted Successfuly',
            status: HttpStatus.OK
        }
    }




    private async calculateTotalPrice({productId, amount}: CreatePurchaseDto): Promise<number> {
        const {price} = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        const totalPrice = currency(price.toNumber()).multiply(amount)

        return totalPrice.value
    }
}
