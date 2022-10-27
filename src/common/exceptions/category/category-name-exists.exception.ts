import { BadRequestException } from '@nestjs/common';
export class CategoryNameExistsException extends BadRequestException {
    constructor() {
        super('Category Name Already In User!')
    }
}