import * as express from 'express'
import {User} from '../models'

export function get(req: express.Request, res: express.Response, next: express.NextFunction) {
  let {userId} = req.params
  let usr = User.getUser(userId)
  res.json(usr)
}

export function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  let usr = User.list()
  res.json(usr)
}
