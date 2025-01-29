import express from 'express'
import {
  createAdress,
  getAdress,
  updateAdress,
  deleteAdress,
} from '../controllers/adress.controller.js'

import auth from '../middleware/auth.js'


const router = express.Router()


router.post('/create-adress', auth , createAdress)
router.get('/get-adress', auth , getAdress)
router.put('/update-adress', auth , updateAdress)
router.delete('/delete-adress', auth , deleteAdress)


export default router
