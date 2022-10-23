import { PrismaModule } from './../prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from "@nestjs/common";


@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    imports: [PrismaModule]
})
export class CategoryModule {}