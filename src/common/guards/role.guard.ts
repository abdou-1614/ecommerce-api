import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import {Reflector} from '@nestjs/core'
import { Role } from "@prisma/client";
import { Observable } from "rxjs";
import { IS_ADMIN } from "../decorators/isAdmin.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN, [
            context.getHandler(),
            context.getClass()
        ])

        const request = context.switchToHttp().getRequest()
        const {userRole} = request.user

        if(isAdmin && userRole === Role.ADMIN) {
            return true
        }

        return false
    }
}