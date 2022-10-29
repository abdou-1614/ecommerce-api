import { JwtExceptionHandler } from './handler/jwt.exception.handler';
import { UserInputExceptionHandler } from './handler/user-input.exception.handler';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { PrismaExceptionHandler } from './handler/prisma.exception.handler';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                new UserInputExceptionHandler().handle(error)

                new PrismaExceptionHandler().handle(error)

                new JwtExceptionHandler().handle(error)

                throw error
            })
        )
    }
}