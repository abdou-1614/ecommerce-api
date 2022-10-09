import { AccessJwtGuard } from './auth/auth-access-jwt.guard';
import { Module } from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core'
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard
    }
  ]
})
export class AppModule {}
