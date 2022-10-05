import {JwtSignOptions} from '@nestjs/jwt'

export const accessJwtConfig: JwtSignOptions = {
    secret: process.env.ACCESS_SECRET,
    expiresIn: '15m'
}

export const refreshJwtConfig:JwtSignOptions = {
    secret: process.env.REFRESH_SECRET,
    expiresIn: '90d'
}