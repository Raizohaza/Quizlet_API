import { CallHandler, ExecutionContext, HttpCode, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Response<T> {
    data: T;
    statusCode: HttpStatus;
    message: string;
    constructor(data, statusCode = HttpStatus.OK,message='Success!'){
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const controller = context.getClass();
    const handler = context.getHandler();

    let httpCode: number | undefined;
    if (Reflect.hasMetadata(HttpCode, controller)) {
      httpCode = Reflect.getMetadata(HttpCode, controller);
    } else if (Reflect.hasMetadata(HttpCode, handler)) {
      httpCode = Reflect.getMetadata(HttpCode, handler);
    }
    
    return next.handle().pipe(
        map(
            data => {
                    if (data instanceof Response)
                        return data;
                    return new Response(data, httpCode, data?.message);    
                }
        ),
    );
  }
}