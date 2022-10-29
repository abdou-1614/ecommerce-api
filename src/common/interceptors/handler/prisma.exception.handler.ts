import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ExceptionHandler } from './execption.handler';
export class PrismaExceptionHandler implements ExceptionHandler {
    handle(error: Error) {
        
    }


    private isPrismaUnknowError(error): boolean {
        return !!error.clientVersion
    }

    private  isEmailConstraintViolation(error: object): boolean {
        return Object.values(error)[0][0] === 'email'
    }

    private isProductNameConstraintViolation(error: PrismaClientKnownRequestError): boolean {
        return (
            Object.values(error.meta)[0][0] === 'name' || 
            Object.values(error.meta)[0][0] === 'urlName') &&
            error.message.includes('prisma.product')
    }

    private isCategoryNameConstraintViolation(error: PrismaClientKnownRequestError): boolean {
        return (
            Object.values(error.meta)[0][0] === 'name' &&
            error.message.includes('prisma.category')
        )
    }

    private isUserError(error: PrismaClientKnownRequestError): boolean {
        return error.message.includes('prisma.user')
    }

    private isProductError(error: PrismaClientKnownRequestError): boolean {
        return (
            error.message.includes('prisma.product.update') &&
            error.message.includes('prisma.product.delete')
        )
    }

    private isCreateProductError(error: PrismaClientKnownRequestError): boolean {
        return error.message.includes('prisma.product.create')
    }

    private isCategoryError(error: PrismaClientKnownRequestError): boolean {
        return error.message.includes('prisma.category')
    }

    private isPurchaseError(error: PrismaClientKnownRequestError): boolean {
        return error.message.includes('prisma.purchase')
    }
}