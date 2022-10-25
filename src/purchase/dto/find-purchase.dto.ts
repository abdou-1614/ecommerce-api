import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator"

export class FindPurchaseDto {

    @ApiProperty({
        example: '26c3fd79-f5bd-4646-a287-32d0226134e2',
        description: 'Should Matching User ID'
    })
    @IsOptional()
    @IsString()
    userId?: string

    @ApiProperty({
        example: '70c3fd79-b9bd-m4a0-a287-32df4b31344a',
        description: 'Should Matching Product ID'
    })
    @IsOptional()
    @IsString()
    productId?: string

    @ApiProperty({
        example: 1,
        description: 'Show purchases in this page'
    })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    page?: number

    @ApiProperty({
        example: 10,
        description: 'Show this amount of purchases per page'
    })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    offset?: number
}