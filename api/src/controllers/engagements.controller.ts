import * as express from 'express'
import APIError from '../util/APIError'
export function get(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): never {
  throw APIError('Not implemented!', 'NotImplemented')
}
export function list(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): never {
  throw APIError('Not implemented!', 'NotImplemented')
}
