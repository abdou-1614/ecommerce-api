import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginDto } from './dto/login-credentials.dto';
import { Body, Controller, HttpCode, Post, Req, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginResponseDto } from './dto/login-response.dto';
import { Public } from './public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserToken } from '@prisma/client';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    /** Authenticates the User */
    @ApiOperation({summary: 'Login User'})
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() {email, password}: LoginDto, @Req() request: Request): Promise<LoginResponseDto> {
      const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        ''
      )

      return this.authService.login(email, password, browserInfo)
    }

    /** Refresh The User Token */
    @ApiOperation({summary: 'User Refresh Token'})
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async refreshToken(@Body() {refreshToken}: RefreshTokenDto, @Req() request: Request): Promise<LoginResponseDto> {
      const browserInfo = `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        ''
      )

      return this.authService.refreshToken(refreshToken, browserInfo)
    }
     
    /** Logs out the User from the current session */
    @ApiOperation({summary: 'Logout User'})
    @ApiBearerAuth()
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body() {refreshToken}: LogoutDto) {
      return this.authService.logout(refreshToken)
    }

  /** Logs out the User from all sessions */

    @ApiOperation({summary: 'Logout The User From All Sessions'})
    @ApiBearerAuth()
    @Post('logouAll')
    @HttpCode(HttpStatus.OK)
    async logoutAll(@Req() request: Request) {
      const {userId} = request.user as {userId: string}

      return this.authService.logoutAll(userId)
    }

     /** Returns all user's active tokens */

     @ApiOperation({summary: 'Find All Users Active Token'})
     @ApiBearerAuth()
     @Get('token')
     async findAllUserToken(@Req() request: Request): Promise<UserToken[]> {
      const {userId} = request.user as {userId: string}

      return this.authService.findAllUserTokens(userId)
     }

}


