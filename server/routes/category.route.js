import express from 'express'
import auth from '../middleware/auth.js'
import {
  AddCategory,
  GetCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.post('/add-category', auth, admin, AddCategory)
router.get('/get-categories', GetCategories)
router.put('/update-category', auth, admin, updateCategory)
router.delete('/delete-category', auth, admin, deleteCategory)

export default router
