import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseClass } from '../utils/response.utils';
import { RESPONSE_STATUS_CODE_STATIC } from 'src/constants';

@Injectable()
export class ResponserInterceptor implements NestInterceptor {
  constructor(private readonly responseClass: ResponseClass) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const urlEntity = response.req.url.split('/')[3];
        const entityQuery = urlEntity.includes('?') ? urlEntity.split('?')[0] : urlEntity;
        const entityName = entityQuery.slice(0, -1).toUpperCase();

        const modifiedData = this.responseClass.modifySuccessResponse(data, response.statusCode, entityName);
        return modifiedData;
      }),
      catchError((error) => {
        let errorObj: any, validations: any;
        if (error.detail) {
          const errorFieldName = error.detail.split(' ');
          errorObj = RESPONSE_STATUS_CODE_STATIC;
          validations = [
            {
              type: errorFieldName[1].split('=')[0],
              detail: error.detail,
            },
          ];
        } else if (error.response !== undefined) {
          if (error.response.response !== undefined) {
            errorObj = error.response.response;
            validations = error.response.response.message.map((e) => {
              const obj = {
                type: e.split(' ')[0],
                detail: e,
              };
              return obj;
            });
          } else {
            errorObj = error.response;
            validations = [
              {
                type: error.response.message.split(' ')[0],
                detail: error.response.message,
              },
            ];
          }
        } else {
          errorObj = RESPONSE_STATUS_CODE_STATIC.STATUS_CODE;
          validations = [
            {
              type: 'Code Error',
              detail: error.message,
            },
          ];
        }
        const modifiedData = this.responseClass.modifyError(errorObj, validations);
        return throwError(() => new HttpException(modifiedData, HttpStatus.BAD_REQUEST));
      }),
    );
  }
}
