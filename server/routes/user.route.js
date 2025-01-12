import express from 'express'
import { signout, signin, signup } from '../controllers/user.controller.js'
import { verifyEmail } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/signin', signin)
router.get('/signout', auth, signout)

export default router
