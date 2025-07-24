import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectDB } from './config/ConnectDB.js'
import { specs, swaggerUi } from './config/swagger.js'
import userRoutes from './routes/user.route.js'
import uploadRoutes from './routes/upload.route.js'
import categoryRoutes from './routes/category.route.js'
import subCategoryRoutes from './routes/subcategory.route.js'
import productRoutes from './routes/product.route.js'
import adressRoutes from './routes/adress.route.js'
import cartRoutes from './routes/cart.route.js'
import OrderRoutes from './routes/order.route.js'

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


// Swagger Documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'TunisianShop API Documentation',
  })
)

// Routes
app.use('/api/user', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/subCategory', subCategoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/adress', adressRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', OrderRoutes)

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
