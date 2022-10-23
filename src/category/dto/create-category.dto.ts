import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from './../entities/category.entity';
export class CreateCategoryDto implements Category {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
}