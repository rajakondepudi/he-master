// HttpStatus Codes
export function ServiceResponse(service: any, code: any): any {
  const StatusMessages = {
    200: {
      status: service.SUCCESS_CODE.status,
      code: service.SUCCESS_CODE.code,
      message: 'FOUND SUCCESSFULLY',
    },
    201: {
      status: service.SUCCESS_CODE.status,
      code: service.SUCCESS_CODE.code,
      message: 'CREATED SUCCESSFULLY',
    },
    400: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'BAD REQUEST',
    },
    401: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'UNAUTHORIZED',
    },
    403: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'FORBIDDEN',
    },
    404: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'NOT FOUND',
    },
    409: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'CONFLICT',
    },
    500: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'INTERNAL SERVER ERROR',
    },
    501: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'NOT IMPLEMENTED',
    },
    503: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'service UNAVAILBLE',
    },
    504: {
      status: service.ERROR_CODE.status,
      code: service.ERROR_CODE.code[code],
      message: 'GATEWAY TIMEOUT',
    },
  };
  return Object.getOwnPropertyDescriptor(StatusMessages, code).value;
}
