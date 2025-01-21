import express from 'express'
import {
  signout,
  signin,
  signup,
  verifyEmail,
  forgotPassword,
  verifyOtp,
  resetPassword,
  refreshToken,
  userDetails,
  uploadAvatar,
  updateProfilUser,
} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/signin', signin)
router.get('/signout', auth, signout)
router.post('/forget-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.put('/reset-password', resetPassword)
router.post('/refresh-token', refreshToken)
router.get('/user-details', auth, userDetails)
router.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
router.put('/update-user', auth, updateProfilUser)

export default router
