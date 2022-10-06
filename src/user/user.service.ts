import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { hashConfig } from 'src/config/hash.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { InvalidPasswordException } from './exceptions/invalid-password.exception';
// import { MissingPasswordException } from './exception/missing-password.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithoutPassword } from './entities/without-password.entity';
import { User } from './entities/user.entity';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

 /** Creates a new user */
    async createUser(createUser: CreateUserDto) {
        const hashedPassword = await hash(createUser.password, hashConfig.salt)
        const lowerCaseEmail = createUser.email.toLowerCase()

        await this.prisma.user.create({
            data: {
                ...createUser, 
                email: lowerCaseEmail, 
                password: hashedPassword
            }
        })
    }

     /** Finds user by id and returns the user without password.
   * Used for default in app requests
   */
    async findById(id: string): Promise<UserWithoutPassword> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        delete user.password
        return {...user}
    }
  /** Finds user by email and returns the user with password.
   * Used in login to compare if the inputted password matches
   * the hashed one.
   */
    async findByEmail(email: string): Promise<User> {
        const lowerCaseEmail = email.toLowerCase()
        return this.prisma.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })
    }

    /**
     * Update User Informations
     */
    async update(id: string, updateUser: UpdateUserDto): Promise<UserWithoutPassword> {
        await this.hashingUpdatingPassword(id, updateUser)
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                ...updateUser, updatedAt: new Date()
            }
        })
        delete user.password 
        return {...user}
    }

     /** Updates user role */
    async updateRole(updateRole: UpdateUserRole): Promise<UserWithoutPassword> {
        const {email, role} = updateRole
        const user = await this.prisma.user.update({
            where: {
                email
            },
            data: {
                role
            }
        })
        delete user.password
        return {...user}
    }

      /** Removes user from database */
    async deleteUser(id: string, deleteUser: DeleteUserDto) {
        this.validateUserCurrentPassword(id, deleteUser.currentPassword)
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

     /** If the user inputted the new password and  the current password
   * the new password is hashed and saved in the database replacing
   * the current one.
   *
   * If only the new password or current password were inputted the user
   * probably forgot about the other one and an error is thrown
   */

    async hashingUpdatingPassword(id: string, updateUserDto: UpdateUserDto) {
        const {password, currentPassword} = updateUserDto
        if(password && currentPassword) {

            await this.validateUserCurrentPassword(id, currentPassword)


            const hashedPassword = await hash(password, hashConfig.salt)

            updateUserDto.password = hashedPassword

            delete updateUserDto.currentPassword
            return
        }

        if(password || currentPassword) {
            throw new Error('Please enter both new password and current password')
        }
    }

    /**
     * Compar if input current password matches 
     * the user password hashed in database
     * 
     * if Not, oh error is thrown
     */
    async validateUserCurrentPassword(id: string, currentPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        const validPassword = await compare(currentPassword, user.password)
        if(!validPassword) {
            throw new InvalidPasswordException()
        }
    }
}
