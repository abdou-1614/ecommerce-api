import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express'
import { MulterConfig } from 'src/config/multer.config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule, MulterModule.register(MulterConfig)]
})
export class ProductsModule {}
