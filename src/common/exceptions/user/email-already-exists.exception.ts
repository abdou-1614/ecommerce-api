import { BadRequestException } from '@nestjs/common';
export class EmailAlreadyExistsException extends BadRequestException {
    constructor() {
        super('E-mail Aleady Exists')
    }
}