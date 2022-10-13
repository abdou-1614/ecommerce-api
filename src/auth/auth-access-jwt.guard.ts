import { IS_PUBLIC } from './public.decorator';
import { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AccessJwtGuard extends AuthGuard('access-jwt') {
    constructor(private reflector: Reflector){
        super()
    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) {
            return true
        }
        return super.canActivate(context)
    }
}