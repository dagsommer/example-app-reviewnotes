import * as express from 'express'
import {ReviewNoteListOptions} from '../models/reviewNote.model'
import {ReviewNote} from '../models'

const DEFAULT_QUERY_PARAMS: ReviewNoteListOptions = {
  limit: 3,
  offset: 0,
}

export function get(req: express.Request, res: express.Response, next: express.NextFunction) {
  let {engagement, reviewNote} = req.params
  let rn = ReviewNote.getReviewNote(engagement, reviewNote)
  res.json(rn)
}

export function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  let queryParams = {...DEFAULT_QUERY_PARAMS, ...req.query}
  let {engagement} = req.params

  let rn = ReviewNote.list(engagement, queryParams)
  res.json(rn)
}
