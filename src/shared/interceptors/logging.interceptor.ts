import type { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        response.header('X-Custom-Header', 'Custom Value');
      }),
    );
  }
}
