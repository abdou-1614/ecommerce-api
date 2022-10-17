import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { Products } from './../entities/products.entity';
export class ProductResponse extends Products {

    @ApiProperty({
        example: '1k4ca8a4-8aa0-4302-ac1b-7b5547f01b0a'
    })
    id?: string;
    @ApiProperty({
        example: 'Apple Smart Watch'
    })
    name: string;
    @ApiProperty({
        example: 'apple-smart-watch'
    })
    urlName: string;
    @ApiProperty({
        example: 'product.jpg'
    })
    image?: string;
    @ApiProperty({
        example: 78,
        type: Number
    })
    price: string | number | Decimal;
    @ApiProperty({
        example: 12
    })
    discountPercentage?: number;
    @ApiProperty({
        example: 62
    })
    stock?: number;
    @ApiProperty({
        example: 'Red Apple Smart Watch Series 7'
    })
    description?: string;

    @ApiProperty({
        example: '2022-10-11T19:21:28.527Z'
    })
    createdAt?: string | Date;
}