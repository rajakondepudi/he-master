import { Injectable } from '@nestjs/common';
import { serviceResponse } from './message.response';

// Class to MOdify Response
@Injectable()
export class ResponseClass {
  responseMethod(code: any): void {
    return serviceResponse(code);
  }

  // Modify Success Response
  modifySuccessResponse(result: any, code: any, entityname: any = '') {
    const returnResponse = this.responseMethod(code);
    const modifiedData = {
      responseData: result,
      responseFooter: {
        status: Object(returnResponse).status,
        code: Object(returnResponse).code,
        message: `${entityname} ${Object(returnResponse).message}`,
        validations: null,
      },
    };
    return modifiedData;
  }

  // Modify Error Response
  modifyError(error: any, validations: any = null) {
    const statusCode = error.statusCode ? error.statusCode : error.STATUS_CODE;
    const returnResponse = this.responseMethod(statusCode);
    const modifiedError = {
      responseData: null,
      responseFooter: {
        status: Object(returnResponse).status,
        code: Object(returnResponse).code,
        message: Object(returnResponse).message,
        validations,
      },
    };
    return modifiedError;
  }
}
