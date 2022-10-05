enum ErrorTypeEnum {
  NotFound,
  CouldNotLoadData,
  BadInput,
  InvalidOption,
  NotImplemented,
}
type ErrorType = keyof typeof ErrorTypeEnum

function getErrorCode(type: ErrorType): number {
  switch (type) {
    case 'NotFound':
      return 404
    case 'CouldNotLoadData':
      return 500
    case 'BadInput':
      return 400
    default:
      return 500
  }
}

class APIError extends Error {
  type: ErrorType
  statusCode: number

  constructor(type: ErrorType, message: string) {
    super(message)
    this.type = type
    this.statusCode = getErrorCode(type)
  }
}

export default function createError(message: string, type: ErrorType) {
  return new APIError(type, message)
}
