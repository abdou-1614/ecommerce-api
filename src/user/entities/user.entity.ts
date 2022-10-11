import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Role } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    /**
     * Id As UUId
     * @example "d31fc56c-7aed-441e-9f7f-151be8d85634"
     */
    @ApiProperty({
        example: 'd31fc56c-7aed-441e-9f7f-151be8d85634'
    })
    id?: string
    /**
     * User Email
     * @example "user@example.com"
     */
     @ApiProperty({
        example: 'user@example.com'
    })
    email: string
    /**
     * @example "$2b$10$1XpzUYu8FuvuaBb3SC0xzuR9DX7KakbMLt0vLNoZ.UnLntDMFc4LK"
     */
    password: string
    /**
     * User Name
     * @example "John Doe"
     */
    
     @ApiProperty({
        example: 'Harry Potter'
    })
    name: string
    /**
     * Note: Admin Users Can Handel The Products !!
     * Default User
     * @example "USER"
     */
     @ApiProperty({
        example: 'USER'
    })
    role?: Role
    /**
     * @example "World Street 0 "
     */
     @ApiProperty({
        example: 'World Street 0'
    })
    address?: string | null

    @ApiProperty({
        example: '2022-10-03T15:41:28.527Z'
    })
    createdAt?: Date | string
    
    @ApiProperty({
        example: '2022-10-03T15:41:28.527Z'
    })
    updatedAt?: Date | string
}