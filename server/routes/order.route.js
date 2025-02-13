import express from 'express'

import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} from '../controllers/order.controller.js'

import auth from '../middleware/auth.js'


const router = express.Router()

router.post('/cash-on-delivery', auth, CashOnDeliveryOrderController)
router.post('/payment', auth, paymentController)
router.get('/order-details', auth, getOrderDetailsController)
router.post('/webhook', webhookStripe)

export default router