import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectDB } from './config/ConnectDB.js'
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
)

const PORT = process.env.PORT || 5000

// Routes
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
