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

/**
 * @swagger
 * /api/subCategory/create-subCategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphones"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d5ecb74b24a8f8c8f4e123"]
 *                 description: Array of category IDs
 *     responses:
 *       201:
 *         description: Subcategory created successfully
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
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/create-subCategory', auth, admin, createSubCategory)

/**
 * @swagger
 * /api/subCategory/get-subCategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Subcategories]
 *     responses:
 *       200:
 *         description: Subcategories retrieved successfully
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
 *                     $ref: '#/components/schemas/SubCategory'
 *       500:
 *         description: Server error
 */
router.get('/get-subCategories', getSubCategories)

/**
 * @swagger
 * /api/subCategory/update-subCategory:
 *   put:
 *     summary: Update a subcategory
 *     tags: [Subcategories]
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
 *               name:
 *                 type: string
 *                 example: "Smartphones"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d5ecb74b24a8f8c8f4e123"]
 *                 description: Array of category IDs
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
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
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Subcategory not found
 */
router.put('/update-subCategory', auth, admin, updateSubCategory)

/**
 * @swagger
 * /api/subCategory/delete-subCategory:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [Subcategories]
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
 *         description: Subcategory deleted successfully
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
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Subcategory not found
 */
router.delete('/delete-subCategory', auth, admin, deleteSubCategory)

export default router
