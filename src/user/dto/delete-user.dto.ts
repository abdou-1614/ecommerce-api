import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty} from 'class-validator'

export class DeleteUserDto {
    
    @ApiProperty({
        example: 'abc123456'
    })
    @IsString()
    @IsNotEmpty()
    currentPassword: string
    
}