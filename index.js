import express from 'express'
import 'dotenv/config'
import userRoutes from './routes/UserRoutes.js'
import connectDb from './database/index.js'
import NewsRoutes from './routes/newsRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import SwaggerRoutes from './routes/SwaggerRoute.cjs'
const app=express()
const port=process.env.PORT

connectDb()
app.use(express.json())
app.use(userRoutes)
app.use(NewsRoutes)
app.use(loginRoutes)
app.use('/doc',SwaggerRoutes)

app.listen(port,()=> console.log('Server on port: ',port))
