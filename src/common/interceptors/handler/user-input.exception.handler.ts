import { PurchaseException } from './../../../purchase/exceptions/purchase-input.exception';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthServiceException } from 'src/auth/exceptions/auth-service.exception';
import { ProductServiceException } from 'src/products/exceptions/product-service-input.exception';
import { UserServiceException } from 'src/user/exceptions/user-input.exception';
import { ExceptionHandler } from './execption.handler';

export class UserInputExceptionHandler implements ExceptionHandler {

    handle(error: Error) {
        if(error instanceof AuthServiceException) {
            throw new UnauthorizedException(error.name)
        }

        if(error instanceof UserServiceException){
            throw new BadRequestException(error.name)
        }

        if(error instanceof ProductServiceException) {
            throw new BadRequestException(error.name)
        }
        
        if(error instanceof PurchaseException) {
            throw new BadRequestException(error.name)
        }
    }
}