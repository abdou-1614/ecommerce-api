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
