import express from 'express'
import auth from '../middleware/auth.js'
import {
  AddCategory,
  GetCategories,
} from '../controllers/category.controller.js'

const router = express.Router()

router.post('/add-category', auth, AddCategory)
router.get('/get-categories', GetCategories)

export default router
