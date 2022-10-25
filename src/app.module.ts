import { AccessJwtGuard } from './auth/auth-access-jwt.guard';
import { Module } from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core'
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductsModule, CategoryModule, PurchaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard
    }
  ]
})
export class AppModule {}
