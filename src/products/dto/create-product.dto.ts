import { Products } from './../entities/products.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Decimal } from '@prisma/client/runtime';
import { ApiFile } from 'src/common/decorators/swagger-file-upload.decorator';
export class CreateProductsDto extends OmitType(Products, ['id', 'urlName', 'createdAt'] as const) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: string | number | Decimal

    @ApiFile()
    @IsNotEmpty()
    picture: Express.Multer.File

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    discountPercentage?: number

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    stock?: number

    @IsString()
    @IsOptional()
    description?: string;


    @IsOptional()
    @IsArray()
    categories?: string[];
}