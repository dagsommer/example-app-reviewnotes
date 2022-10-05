import express from 'express'
import {errorMiddleware} from './middleware'
import routes from './routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
/*
For a real application, one would also use middleware, 
i.e. for authentication:

import authentication from './middleware/authentication.middleware.ts'
app.use(authentication)

which is out of the scope for this assignment
*/

app.use(routes)

//handle errors for express
app.use(errorMiddleware)
export default app
