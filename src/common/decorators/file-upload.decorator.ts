import { UpdateProductimage } from './../../products/dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileToBodyInterceptor } from 'src/products/interceptors/file.interceptor';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
export function FileUpload(): <TFunction>(
    target: object | TFunction,
    propertKey?: string | symbol
) => void {
    return applyDecorators(
        UseInterceptors(FileInterceptor('image'), FileToBodyInterceptor),
        ApiConsumes('multipart/form-data'),
        ApiBody({type: UpdateProductimage})
    )
}