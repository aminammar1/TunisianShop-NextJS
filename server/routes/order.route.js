import express from 'express'

import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} from '../controllers/order.controller.js'

import auth from '../middleware/auth.js'

const router = express.Router()

/**
 * @swagger
 * /api/order/cash-on-delivery:
 *   post:
 *     summary: Create cash on delivery order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - list_items
 *               - addressId
 *               - subTotalAmt
 *               - totalAmt
 *             properties:
 *               list_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               addressId:
 *                 type: string
 *               subTotalAmt:
 *                 type: number
 *               totalAmt:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.post('/cash-on-delivery', auth, CashOnDeliveryOrderController)

/**
 * @swagger
 * /api/order/payment:
 *   post:
 *     summary: Create payment intent for online payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - list_items
 *               - addressId
 *               - subTotalAmt
 *               - totalAmt
 *             properties:
 *               list_items:
 *                 type: array
 *                 items:
 *                   type: object
 *               addressId:
 *                 type: string
 *               subTotalAmt:
 *                 type: number
 *               totalAmt:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 id:
 *                   type: string
 *                 client_secret:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/payment', auth, paymentController)

/**
 * @swagger
 * /api/order/order-details:
 *   get:
 *     summary: Get user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get('/order-details', auth, getOrderDetailsController)

/**
 * @swagger
 * /api/order/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Orders]
 *     description: Handles Stripe webhook events for payment processing
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook
 */
router.post('/webhook', webhookStripe)

export default router
