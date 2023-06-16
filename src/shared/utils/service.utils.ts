// Master Service
export const MSService = {
  SUCCESS_CODE: {
    status: 'SUCCESS',
    code: 'MSTRSCS-001',
  },
  ERROR_CODE: {
    status: 'FAILED',
    code: {
      400: 'MSTRERR-001',
      401: 'MSTRERR-002',
      403: 'MSTRERR-003',
      404: 'MSTRERR-004',
      409: 'MSTRERR-005',
      500: 'MSTRERR-006',
      501: 'MSTRERR-007',
      503: 'MSTRERR-008',
      504: 'MSTRERR-009',
    },
  },
};
