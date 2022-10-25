import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [PrismaModule]
})
export class PurchaseModule {}
