import { FindPurchaseDto } from './dto/find-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import currency from 'currency.js';
import { Purchase } from './entities/purchase.entity';

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
