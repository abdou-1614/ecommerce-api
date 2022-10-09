import { AccessJwtContent } from './types/access-token-content';
import { AccessTokenPayload } from './types/access-token-payload';
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessJwtConfig } from 'src/config/jwt.config';
/** Passport Access JsonWebToken configuration */
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: accessJwtConfig.secret
            })
    }

     /** Returns data after JWT is decrypted */

    async validate(payload: AccessTokenPayload): Promise<AccessJwtContent> {
        return {
            userId: payload.sub,
            userRole: payload.userRole
        }
    }
}