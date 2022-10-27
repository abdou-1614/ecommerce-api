import { NotFoundException } from '@nestjs/common';
export class ProductNotFoundException extends NotFoundException {
    constructor() {
        super('Product Not Found')
    }
}