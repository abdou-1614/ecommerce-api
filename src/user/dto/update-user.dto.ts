import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    /**
   * User current password
   * @example "abc123456"
   */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        example: 'abc123456'
    })
    currentPassword?: string
    
}