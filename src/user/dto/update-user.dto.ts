import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    /**
   * User current password
   * @example "abc123456"
   */
    currentPassword: string
}