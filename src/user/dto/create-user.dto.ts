import { IsEmail, IsString, IsOptional, Matches, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto implements User {

    @IsEmail({message: 'Must be An Email'})
    email: string

    @IsString()
    @MinLength(8, {message: 'Password Must have at least 8 character'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
        message: 'Password Must contains at least 1 number and 1 letter'
    })
    password: string

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    address: string
}