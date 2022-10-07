import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common'
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { RoleGuard } from '../guards/role.guard'

export const IS_ADMIN = 'isAdmin'


/**
 * Make an endpoints accessible only by Admin
 * 
 * Example: Create, Update Products Or Update User Role
 */
export function isAdmin(): <T>(
    target: object | T,
    propertyKey?: string | symbol
) => void {
    return applyDecorators(
        SetMetadata(IS_ADMIN, true),
        UseGuards(RoleGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({description: 'Unauthorized'}),
        ApiForbiddenResponse({description: 'Forbidden'})
    )
}