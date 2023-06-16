import { Injectable } from '@nestjs/common';
import { ServiceResponse } from './message.response';

// Class to MOdify Response
@Injectable()
export class ResponseClass {
  responseMethod(code: any): void {
    return ServiceResponse( code);
  }

  // Modify Success Response
  modifySuccessResponse(result: any, code: any, entityname: any = '') {
    const returnresponse = this.responseMethod( code);
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
  modifyError(error: any, validations: any = null) {
    const returnresponse = this.responseMethod(error.statusCode);
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
