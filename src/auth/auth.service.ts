import { User } from './../user/entities/user.entity';
import { RefreshTokenPayload } from './types/refresh-token-payload';
import { InvalidEmailOrPassword } from './exceptions/invalid-email-or-password.exception';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid'
import {JwtService} from '@nestjs/jwt'
import { accessJwtConfig, refreshJwtConfig } from 'src/config/jwt.config';
import {TokenExpirationDate} from '../utils/tokenExpirationDate'
import { LoginResponseDto } from './dto/login-response.dto';
import { UserToken } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
    ){}
     /** Check if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If exists so, returns the access and refresh JWTs please
   */
  async login(email: string, password: string, browserInfo?: string): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password)
    const payload = {sub: user.id, userRole: user.role}

    const accessToken = await this.generateAccessToken(payload)

    const refreshToken = await this.createRefreshToken({
        sub: payload.sub
    }, browserInfo)

    return {
        accessToken,
        refreshToken
    }
  }
   /** Refreshes and rotates user's access and refresh tokens */

   async refreshToken(refreshTokens: string, browserInfo?: string): Promise<LoginResponseDto> {
    const refreshTokenContent: RefreshTokenPayload = await this.jwtService.verifyAsync(refreshTokens, refreshJwtConfig)
    
    await this.validateRefreshToken(refreshTokens, refreshTokenContent)

    const userRole = await this.getUserRole(refreshTokenContent.sub)

    const accessToken = await this.generateAccessToken({
        sub: refreshTokenContent.sub,
        userRole
    })

    const newRefreshToken = await this.rotateRefreshToken(
        refreshTokens,
        refreshTokenContent,
        browserInfo
    )

    return {
        accessToken,
        refreshToken: newRefreshToken
    }
   }
     /** Deletes the refreshToken from the database*/

    async logout(refreshTokens: string) {
        await this.prisma.userToken.deleteMany({
            where: {
                refreshTokens
            }
        })
    }

      /** Deletes all user's refresh tokens */
    async logoutAll(userId: string) {
        await this.prisma.userToken.deleteMany({
            where: {
                userId
            }
        })
    }

    /** Returns all user's active tokens */

    async findAllUserTokens(userId: string): Promise<UserToken[]> {
        const tokens = await this.prisma.userToken.findMany({
            where: {
                userId
            }
        })

        return tokens
    }


    /**Check if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If not, Oh!! The Error Thrown
   */

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email)

        if (user) {
            const isPasswordValid = await compare(password, user.password);
      
            if (isPasswordValid) {
              return { ...user, password: undefined };
            }
          }
      
          throw new InvalidEmailOrPassword();
    }
     /** Generates access token */

     async generateAccessToken(payload: {sub: string, userRole: string}): Promise<string> {
        const accessToken = await this.jwtService.signAsync(
            payload,
            accessJwtConfig
        )
        return accessToken
     }

     /** Creates the refresh token and saves it in the database */

     async createRefreshToken(payload: {sub: string, tokenFamily?: string}, browserInfo?: string): Promise<string> {
        if(!payload.tokenFamily){
            payload.tokenFamily = uuidV4()
        }

        const refreshTokens = await this.jwtService.signAsync(
            payload,
            refreshJwtConfig
        )
        await this.saveRefereshToken({
            userId: payload.sub,
            refreshTokens,
            family: payload.tokenFamily,
            browserInfo
     })
     return refreshTokens
     }

     /** Save the new refresh token hashed in the database */

     async saveRefereshToken(refreshTokenCredentials: {
        userId: string,
        refreshTokens: string,
        family: string,
        browserInfo?: string
     }) {
        const expireIn = TokenExpirationDate()

        await this.prisma.userToken.create({
            data: {
                ...refreshTokenCredentials, expireIn
            }
        })
     }
       /** Checks if the refresh token is valid */
    async validateRefreshToken(refreshTokens: string, refreshTokensContent: RefreshTokenPayload): Promise<boolean> {
        const tokenFamily = await this.prisma.userToken.findMany({
            where: {
                userId: refreshTokensContent.sub,
                refreshTokens
            }
        })
        const isValidRefreshToken = tokenFamily.length > 0
        if(!isValidRefreshToken) {
            await this.deleteRefreshTokenFamilyIfCompromised(
                refreshTokensContent.sub,
                refreshTokensContent.tokenFamily
            )
        }

        return true
    }
    /** Removes a compromised refresh token family from the database
   *
   * If a token that is not in the database is used but it's family exists
   * that means the token has been compromised and the family should be removed
   */
     async deleteRefreshTokenFamilyIfCompromised(userId: string, tokenFamily: string) {
        const tokensFamily = await this.prisma.userToken.findMany({
            where: {
                userId,
                family: tokenFamily
            }
        })
        if(tokensFamily.length > 0) {
            await this.prisma.userToken.deleteMany({
                where: {
                    userId,
                    family: tokenFamily
                }
            })
        }
     }

       /** Delete the old token from the database and creates a new one */
    async rotateRefreshToken(
        refreshTokens: string,
        refreshTokenContent: RefreshTokenPayload,
        browserInfo?: string
    ): Promise<string> {

        await this.prisma.userToken.deleteMany({where: {refreshTokens}})
        const newRefreshTokens = await this.createRefreshToken({
            sub: refreshTokenContent.sub,
            tokenFamily: refreshTokenContent.tokenFamily
        }, browserInfo)

        return newRefreshTokens
    }

    /** Get User Role */
    async getUserRole(userId: string) {
        const user = await this.userService.findById(userId)
        return user.role
    }
}
