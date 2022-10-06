import { Prisma, Role } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    /**
     * Id As UUId
     * @example "d31fc56c-7aed-441e-9f7f-151be8d85634"
     */
    id?: string
    /**
     * User Email
     * @example "user@example.com"
     */
    email: string
    /**
     * @example "$2b$10$1XpzUYu8FuvuaBb3SC0xzuR9DX7KakbMLt0vLNoZ.UnLntDMFc4LK"
     */
    password: string
    /**
     * User Name
     * @example "John Doe"
     */
    name: string
    /**
     * Note: Admin Users Can Handel The Products !!
     * Default User
     * @example "USER"
     */
    role?: Role
    /**
     * @example "World Street 0 "
     */
    address?: string | null

    createdAt?: Date | string
    
    updatedAt?: Date | string
}