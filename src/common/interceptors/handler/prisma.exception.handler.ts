import { PurchaseNotFoundException } from './../../exceptions/purchase/purchase-not-found.exception';
import { ProductNameExistsException } from './../../exceptions/product/product-name-exists.exception';
import { CategoryNameExistsException } from './../../exceptions/category/category-name-exists.exception';
import { ProductNotFoundException } from './../../exceptions/product/product-not-found.exception';
import { CategoryNotFoundException } from './../../exceptions/category/category-not-found.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ExceptionHandler } from './execption.handler';
import {PrismaError} from 'prisma-error-enum'
import { UserNoTFoundException } from 'src/common/exceptions/user/user-not-found.exception';
import { EmailAlreadyExistsException } from 'src/common/exceptions/user/email-already-exists.exception';
export class PrismaExceptionHandler implements ExceptionHandler {

    /** Catches Prisma ORM errors and throws the
   * respective HTTP error
   */

    handle(error: Error) {
        if(error instanceof PrismaClientKnownRequestError) {
            switch(error.code) {
                case PrismaError.RecordsNotFound:
                    if(this.isUserError(error)) {
                        throw new UserNoTFoundException()
                    }
                    if(this.isCreateProductError(error)) {
                        throw new CategoryNotFoundException()
                    }
                    if(this.isCategoryError(error)) {
                        throw new CategoryNotFoundException()
                    }
                    if(this.isProductError(error)) {
                        throw new ProductNotFoundException()
                    }
                    if(this.isPurchaseError(error)) {
                        throw new PurchaseNotFoundException()
                    }
                    break;
                case PrismaError.UniqueConstraintViolation:
                    if(this.isEmailConstraintViolation(error.meta)) {
                        throw new EmailAlreadyExistsException()
                    }
                    if(this.isCategoryNameConstraintViolation(error)) {
                        throw new CategoryNameExistsException()
                    }
                    if(this.isProductNameConstraintViolation(error)) {
                        throw new ProductNameExistsException()
                    }
                    break;
                case PrismaError.ForeignConstraintViolation:
                    if(this.isPurchaseError(error)) {
                        throw new PurchaseNotFoundException()
                    }
                    break;
                default:
                    throw error
            }
        }
        if (this.isPrismaUnknowError(error)) {
            if (error.message === 'No Product found') {
              throw new ProductNameExistsException();
            }
      
            if (error.message === 'No Category found') {
              throw new CategoryNameExistsException();
            }
      
            if (error.message === 'No Purchase found') {
              throw new PurchaseNotFoundException();
            }
        }
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