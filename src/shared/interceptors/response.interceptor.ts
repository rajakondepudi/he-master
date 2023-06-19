import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseClass } from '../utils/response.utils';
import { RESPONSE_STATUS_CODE_STATIC } from 'src/constants';

@Injectable()
export class ResponserInterceptor implements NestInterceptor {
  constructor(private readonly responseClass: ResponseClass) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const Ctx = context.switchToHttp();
    const Response = Ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const UrlEntity = Response.req.url.split('/')[3];
        const EntityQuery = UrlEntity.includes('?') ? UrlEntity.split('?')[0] : UrlEntity;
        const EntityName = EntityQuery.slice(0, -1).toUpperCase();

        const ModifiedData = this.responseClass.modifySuccessResponse(data, Response.statusCode, EntityName);
        return ModifiedData;
      }),
      catchError((error) => {
        let ErrorObj: any, Validations: any;
        if (error.detail) {
          const ErrorFieldName = error.detail.split(' ');
          ErrorObj = RESPONSE_STATUS_CODE_STATIC;
          Validations = [
            {
              type: ErrorFieldName[1].split('=')[0],
              detail: error.detail,
            },
          ];
        } else if (error.response !== undefined) {
          if (error.response.response !== undefined) {
            ErrorObj = error.response.response;
            Validations = error.response.response.message.map((e) => {
              const Obj = {
                type: e.split(' ')[0],
                detail: e,
              };
              return Obj;
            });
          } else {
            ErrorObj = error.response;
            Validations = [
              {
                type: error.response.message.split(' ')[0],
                detail: error.response.message,
              },
            ];
          }
        } else {
          ErrorObj = RESPONSE_STATUS_CODE_STATIC.STATUS_CODE;
          Validations = [
            {
              type: 'Code Error',
              detail: error.message,
            },
          ];
        }
        const ModifiedData = this.responseClass.modifyError(ErrorObj, Validations);
        return throwError(() => new HttpException(ModifiedData, HttpStatus.BAD_REQUEST));
      }),
    );
  }
}
