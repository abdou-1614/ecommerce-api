import { BadRequestException } from '@nestjs/common';
export class ProductNameExistsException extends BadRequestException {
    constructor() {
        super('Product Name Already In Use!')
    }
}