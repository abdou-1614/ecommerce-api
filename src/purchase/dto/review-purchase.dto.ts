import { Purchase } from './../entities/purchase.entity';
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class ReviewDto extends PickType(Purchase, ['reviewNote', 'reviewComment'] as const ) {

    @ApiProperty({
        example: 5,
        type: Number
    })
    @IsInt()
    @Min(1)
    @Max(5)
    reviewNote?: number;

    @ApiProperty({
        example: 'I am Happy To Buy This phone'
    })
    @IsString()
    @IsOptional()
    reviewComment?: string 
}