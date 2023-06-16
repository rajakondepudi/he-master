import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceResponse } from '../utils/message.response';
import { MSService } from '../utils/service.utils';
import { ResponseClass } from '../utils/response.utils';

@Injectable()
export class ResponserInterceptor implements NestInterceptor {
  constructor(private readonly responseClass: ResponseClass) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    // Service Name for interceptor
    const servicename = MSService;
    return next.handle().pipe(
      map((data) => {
        const urlentity = response.req.url.split('/')[3];
        const entityquery = urlentity.includes('?') ? urlentity.split('?')[0] : urlentity;
        const entityname = entityquery.slice(0, -1).toUpperCase();

        const modifiedData = this.responseClass.modifySuccessResponse(data, response.statusCode, entityname, servicename);
        return modifiedData;
      }),
      catchError((error) => {
        let errorobj: any, validations: any;
        if (error.detail) {
          const errorfieldname = error.detail.split(' ');
          errorobj = {
            statusCode: 400,
          };
          validations = [
            {
              type: errorfieldname[1].split('=')[0],
              detail: error.detail,
            },
          ];
        } else if (error.response !== undefined) {
          if (error.response.response !== undefined) {
            errorobj = error.response.response;
            validations = error.response.response.message.map((e) => {
              const obj = {
                type: e.split(' ')[0],
                detail: e,
              };
              return obj;
            });
          } else {
            errorobj = error.response;
            validations = [
              {
                type: error.response.message.split(' ')[0],
                detail: error.response.message,
              },
            ];
          }
        } else {
          errorobj = {
            statusCode: 500,
          };
          validations = [
            {
              type: 'Code Error',
              detail: error.message,
            },
          ];
        }
        const modifiedData = this.responseClass.modifyError(errorobj, validations, servicename);
        return throwError(() => new HttpException(modifiedData, HttpStatus.BAD_REQUEST));
      }),
    );
  }
}
