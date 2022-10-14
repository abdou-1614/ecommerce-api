import { AccessJwtGuard } from './auth/auth-access-jwt.guard';
import { Module } from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core'
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard
    }
  ]
})
export class AppModule {}
