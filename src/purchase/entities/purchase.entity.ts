import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class Purchase implements Prisma.PurchaseUncheckedCreateInput {

    @ApiProperty({
        example: 'b076f72e-f70b-4368-949e-1811c405c0f7'
    })
    id?: string;

    @ApiProperty({
        example: 'f601f72e-f70b-1098-949e-1811c405cn67'
    })
    userId?: string;

    @ApiProperty({
        example: 'e4b1272e-f70b-1098-949e-1811c405cn67'
    })
    productId: string;

    @ApiProperty({
        default: 3,
        type: Number
    })
    amount?: number;

    @ApiProperty({
        default: 147,
        type: Number
    })
    totalPrice: string | number | Prisma.Decimal;

    @ApiProperty({
        default: 5,
        type: Number
    })
    reviewNote?: number;

    @ApiProperty({
        example: 'Amazing wheelchair!',
        type: Number
    })
    reviewComment?: string;
    
    @ApiProperty({
        example: '2022-05-13T15:41:28.527Z',
        type: String
    })
    createdAt?: string | Date;
}