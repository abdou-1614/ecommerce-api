import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
export class Category implements Prisma.CategoryUncheckedCreateInput {
   /**
   * Category ID as UUID
   * @example "e6cf9a58-438c-4fce-8d85-db3d22db270a"
   */
    @ApiProperty({
        example: 'e6cf9a58-438c-4fce-8d85-db3d22db270a'
    })
    id?: string;

   /**
   * Category name
   * @example "Decoration"
   */
    @ApiProperty({
        example: 'SmartPhones'
    })
    name: string;
}