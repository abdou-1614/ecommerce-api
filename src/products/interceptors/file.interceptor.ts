import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class FileToBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest()

        if(req.body && req.file?.fieldname ){
            const {fieldname } = req.file
            if(!req.body[fieldname ]){
                req.body[fieldname ] = req.file
            }
        }
        return next.handle()
    }
}