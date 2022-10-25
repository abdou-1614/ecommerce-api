import { Purchase } from './../entities/purchase.entity';
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreatePurchaseDto extends PickType(Purchase, ['productId', 'amount'] as const) {

    @ApiProperty()
    @IsUUID(4)
    productId: string;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsOptional()
    amount?: number;
}