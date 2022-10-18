import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class FindProductDto {

    /** String containing in product name
   * @example "apple"
   */
    @ApiProperty({
        description: 'String containing in product name',
        example: 'apple'
    })
    @IsOptional()
    @IsString()
    productName?: string

    /** Show products in this page
   * @example 1
   */

    @ApiProperty({
        description: 'Show Products In This Page',
        example: 1
    })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    page?: number

    /** Show this amount of products per page
   * @example 10
   */
    @ApiProperty({
        description: 'Show This Amount Of Products Per Page',
        example: 10
    })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    offset?: number

}