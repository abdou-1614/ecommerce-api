import { Products } from './../entities/products.entity';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Decimal } from '@prisma/client/runtime';
import { ApiFile } from 'src/common/decorators/swagger-file-upload.decorator';
import { Type } from 'class-transformer';
export class CreateProductsDto extends OmitType(Products, ['id', 'urlName', 'createdAt', 'image'] as const) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({
        type: Number
    })
    price: number | string | Decimal

    @ApiFile()
    @IsNotEmpty()
    image: Express.Multer.File

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty()
    discountPercentage?: number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    stock?: number

    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;


    @IsOptional()
    @IsArray()
    categories?: string[];
}