import { Injectable } from '@nestjs/common';
import { ServiceResponse } from './message.response';
import { MSService } from './service.utils';

// Class to MOdify Response
@Injectable()
export class ResponseClass {
  responseMethod(service: any, code: any): void {
    return ServiceResponse(service, code);
  }

  // Modify Success Response
  modifySuccessResponse(result: any, code: any, entityname: any = '', servicename: any) {
    const returnresponse = this.responseMethod(servicename, code);
    const modifiedData = {
      responseData: result,
      responseFooter: {
        status: Object(returnresponse).status,
        code: Object(returnresponse).code,
        message: `${entityname} ${Object(returnresponse).message}`,
        validations: null,
      },
    };
    return modifiedData;
  }

  // Modify Error Response
  modifyError(error: any, validations: any = null, servicename: any) {
    const returnresponse = this.responseMethod(servicename, error.statusCode);
    const modifiedError = {
      responseData: null,
      responseFooter: {
        status: Object(returnresponse).status,
        code: Object(returnresponse).code,
        message: Object(returnresponse).message,
        validations,
      },
    };
    return modifiedError;
  }
}
