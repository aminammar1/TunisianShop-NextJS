import express from 'express'
import auth from '../middleware/auth.js'
import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategory.controller.js'

import admin from '../middleware/admin.js'

const router = express.Router()

router.post('/create-subCategory', auth, admin, createSubCategory)
router.get('/get-subCategories', getSubCategories)
router.put('/update-subCategory', auth, admin, updateSubCategory)
router.delete('/delete-subCategory', auth, admin, deleteSubCategory)

export default router
