import express from 'express'
import { createProduct } from '../controllers/product.controller.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.post('/create-product', auth, admin, createProduct)

export default router
