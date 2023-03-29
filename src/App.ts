import express from 'express'
import './database/connection'
import 'reflect-metadata'
import router from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.listen(4000)