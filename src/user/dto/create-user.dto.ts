import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional, Matches, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto implements User {

    @ApiProperty({
        uniqueItems: true,
        example: 'test@example.com'
    })
    
    @IsEmail({message: 'Must be An Email'})
    email: string

    @ApiProperty({
        minLength: 6,
        example: 'abc123456'
    })
    @IsString()
    @MinLength(8, {message: 'Password Must have at least 8 character'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
        message: 'Password Must contains at least 1 number and 1 letter'
    })
    password: string

    @ApiProperty({
        example: 'Harry Potter'
    })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({
        example: 'World Street'
    })
    @IsString()
    @IsOptional()
    address: string
}