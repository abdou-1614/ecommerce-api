import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator"

export class FindCategoryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'String containing in category name',
        example: 'apple'
    })
    categoryName?: string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @IsPositive()
    @ApiProperty({
        description: 'Show categories in this page',
        example: 1
    })
    page?: number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @IsPositive()
    @ApiProperty({
        description: 'Show this amount of categories per page',
        example: 10
    })
    offset?: number
}