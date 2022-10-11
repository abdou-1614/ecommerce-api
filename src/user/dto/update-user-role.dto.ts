import { IsEmail, IsEnum } from 'class-validator';
import { Role } from "@prisma/client"
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRole {
    @ApiProperty({
        example: 'test@example.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'ADMIN'
    })
    @IsEnum(Role)
    role: Role
}