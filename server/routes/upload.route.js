import express from 'express'
import auth from '../middleware/auth.js'
import uploadImage from '../controllers/uploadImage.controller.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/upload-image', auth, upload.single('image'), uploadImage)

export default router
