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
} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/signin', signin)
router.get('/signout', auth, signout)
router.post('/forget-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.put('/reset-password', resetPassword)
router.post('/refresh-token', refreshToken)

export default router
