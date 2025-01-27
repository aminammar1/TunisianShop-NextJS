import express from 'express'
import auth from '../middleware/auth.js'
import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategory.controller.js'

const router = express.Router()

router.post('/create-subCategory', auth, createSubCategory)
router.get('/get-subCategories', getSubCategories)
router.put('/update-subCategory', auth, updateSubCategory)
router.delete('/delete-subCategory', auth, deleteSubCategory)

export default router
