import { NotFoundException } from '@nestjs/common';
export class UserNoTFoundException extends NotFoundException {
    constructor() {
        super('User Not Found')
    }
}