import { UnauthorizedException } from '@nestjs/common';
import { ExceptionHandler } from './execption.handler';
export class JwtExceptionHandler implements ExceptionHandler {

    private jwtErrorNames = [
        'TokenExpireError',
        'JsonWebTokenError',
        'NotBeforeError'
    ]

    handle(error: Error) {
        if(this.isJwtException(error)) {
            throw new UnauthorizedException('Invalid authorization Token')
        }
    }

    private isJwtException(error: Error): boolean {
        return this.jwtErrorNames.includes(error.name)
    }

}