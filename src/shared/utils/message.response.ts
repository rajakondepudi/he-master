// HttpStatus Codes
export function ServiceResponse(code: any): any {
  const StatusMessages = {
    200: {
      status: 'SUCCESS',
      code: 'MSTRSCS-001',
      message: 'FOUND SUCCESSFULLY',
    },
    201: {
      status: 'SUCCESS',
      code: 'MSTRSCS-001',
      message: 'CREATED SUCCESSFULLY',
    },
    400: {
      status: 'FAILED',
      code: 'MSTRERR-001',
      message: 'BAD REQUEST',
    },
    401: {
      status: 'FAILED',
      code: 'MSTRERR-002',
      message: 'UNAUTHORIZED',
    },
    403: {
      status: 'FAILED',
      code: 'MSTRERR-003',
      message: 'FORBIDDEN',
    },
    404: {
      status: 'FAILED',
      code: 'MSTRERR-004',
      message: 'NOT FOUND',
    },
    409: {
      status: 'FAILED',
      code: 'MSTRERR-005',
      message: 'CONFLICT',
    },
    500: {
      status: 'FAILED',
      code: 'MSTRERR-006',
      message: 'INTERNAL SERVER ERROR',
    },
    501: {
      status: 'FAILED',
      code: 'MSTRERR-007',
      message: 'NOT IMPLEMENTED',
    },
    503: {
      status: 'FAILED',
      code: 'MSTRERR-008',
      message: 'service UNAVAILBLE',
    },
    504: {
      status: 'FAILED',
      code: 'MSTRERR-009',
      message: 'GATEWAY TIMEOUT',
    },
  };
  return Object.getOwnPropertyDescriptor(StatusMessages, code).value;
}
