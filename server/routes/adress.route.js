import express from 'express'
import {
  createAdress,
  getAdress,
  updateAdress,
  deleteAdress,
} from '../controllers/adress.controller.js'

import auth from '../middleware/auth.js'

const router = express.Router()

/**
 * @swagger
 * /api/adress/create-adress:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_line
 *               - city
 *               - state
 *               - country
 *               - pincode
 *             properties:
 *               address_line:
 *                 type: string
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 example: "Tunis"
 *               state:
 *                 type: string
 *                 example: "Tunis"
 *               country:
 *                 type: string
 *                 example: "Tunisia"
 *               pincode:
 *                 type: string
 *                 example: "1000"
 *               mobile:
 *                 type: string
 *                 example: "+216 12 345 678"
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/create-adress', auth, createAdress)

/**
 * @swagger
 * /api/adress/get-adress:
 *   get:
 *     summary: Get user addresses
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
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
 *                     $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 */
router.get('/get-adress', auth, getAdress)

/**
 * @swagger
 * /api/adress/update-adress:
 *   put:
 *     summary: Update an address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "60d5ecb74b24a8f8c8f4e123"
 *               address_line:
 *                 type: string
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 example: "Tunis"
 *               state:
 *                 type: string
 *                 example: "Tunis"
 *               country:
 *                 type: string
 *                 example: "Tunisia"
 *               pincode:
 *                 type: string
 *                 example: "1000"
 *               mobile:
 *                 type: string
 *                 example: "+216 12 345 678"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.put('/update-adress', auth, updateAdress)

/**
 * @swagger
 * /api/adress/delete-adress:
 *   delete:
 *     summary: Delete an address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "60d5ecb74b24a8f8c8f4e123"
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.delete('/delete-adress', auth, deleteAdress)

export default router
