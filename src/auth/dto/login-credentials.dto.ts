import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    /**
     * User E-mail
     * @example "example123@test.com"
     */
    @ApiProperty({
      example: 'test@example.com'
    })
    @IsEmail()
    email: string

      /**
   * User password
   * @example "abc123456"
   */
  @ApiProperty({
    example: 'abc123456'
  })
    @IsString()
    @IsNotEmpty()
    password: string
}