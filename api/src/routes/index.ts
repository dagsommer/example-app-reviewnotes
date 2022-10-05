import {Router} from 'express'
import {ReviewNotes, Engagements, Users} from '../controllers'

const routes = Router()

//Engagements
routes.get('/engagements/', Engagements.list)
routes.get('/engagements/:engagement', Engagements.get)

//Review Notes
routes.get('/engagements/:engagement/reviewnotes', ReviewNotes.list)
routes.get('/engagements/:engagement/reviewnotes/:reviewNote', ReviewNotes.get)

//Users
routes.get('/users', Users.list)
routes.get('/users/:userId', Users.get)

export default routes
