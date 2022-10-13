import { refreshJwtConfig } from './../config/jwt.config';
import ms from 'ms'

export function TokenExpirationDate(): Date {
    const expireIn = ms(refreshJwtConfig.expiresIn as string) / 1000 / 60 / 60 / 24
    const expireAt = AddDays(expireIn)
    return expireAt
}


/**
 * Add Amount Of Days Start From Today
 */

function AddDays(days: number): Date {
    const result = new Date()
    result.setDate(result.getDate() + days)
    return result
}