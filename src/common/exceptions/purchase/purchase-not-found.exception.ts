import { NotFoundException } from '@nestjs/common';
export class PurchaseNotFoundException extends NotFoundException {
    constructor() {
        super('Purchase Not Found')
    }
}