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
    const ReturnResponse = this.responseMethod(code);
    const ModifiedData = {
      responseData: result,
      responseFooter: {
        status: Object(ReturnResponse).status,
        code: Object(ReturnResponse).code,
        message: `${entityname} ${Object(ReturnResponse).message}`,
        validations: null,
      },
    };
    return ModifiedData;
  }

  // Modify Error Response
  modifyError(error: any, validations: any = null) {
    const ReturnResponse = this.responseMethod(error.statusCode);
    const ModifiedError = {
      responseData: null,
      responseFooter: {
        status: Object(ReturnResponse).status,
        code: Object(ReturnResponse).code,
        message: Object(ReturnResponse).message,
        validations,
      },
    };
    return ModifiedError;
  }
}
