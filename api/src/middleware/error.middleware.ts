import {NextFunction, Request, Response} from 'express'
import APIError from '../util/APIError'
type APIErrorType = ReturnType<typeof APIError>

function errorIsAPIError(error: Error | APIErrorType): error is APIErrorType {
  if ((error as APIErrorType).statusCode) {
    return true
  }
  return false
}

export const errorMiddleware = (
  error: Error | APIErrorType,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!errorIsAPIError(error)) {
    response.status(500).send({
      error: {
        statusCode: 500,
        message: 'Something went wrong',
      },
    })
  } else {
    const apiError = error as APIErrorType

    response.status(apiError.statusCode).send({
      error: {
        statusCode: apiError.statusCode,
        message: apiError.message,
      },
    })
  }
}
