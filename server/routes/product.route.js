import express from 'express'
import {
  createProduct,
  getProducts,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  productDetails,
  updateProduct,
  deleteProduct,
  searchProduct,
} from '../controllers/product.controller.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
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
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               subCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *               unit:
 *                 type: string
 *                 example: "piece"
 *               stock:
 *                 type: number
 *                 example: 100
 *               price:
 *                 type: number
 *                 example: 999.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *               more_details:
 *                 type: object
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/create-product', auth, admin, createProduct)

/**
 * @swagger
 * /api/product/get-products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     $ref: '#/components/schemas/Product'
 *                 totalCount:
 *                   type: number
 *                 totalPage:
 *                   type: number
 */
router.get('/get-products', getProducts)

/**
 * @swagger
 * /api/product/products-by-category:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/products-by-category', getProductByCategory)

/**
 * @swagger
 * /api/product/search-product:
 *   get:
 *     summary: Search products by name or description
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Search results
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
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/search-product', searchProduct)

/**
 * @swagger
 * /api/product/productDetails:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/productDetails', productDetails)

/**
 * @swagger
 * /api/product/update-product:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
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
 *                 example: "iPhone 15 Pro"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               subCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *               unit:
 *                 type: string
 *                 example: "piece"
 *               stock:
 *                 type: number
 *                 example: 100
 *               price:
 *                 type: number
 *                 example: 999.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *               more_details:
 *                 type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.put('/update-product', auth, admin, updateProduct)

/**
 * @swagger
 * /api/product/delete-product:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
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
 *         description: Product deleted successfully
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
 *         description: Product not found
 */
router.delete('/delete-product', auth, admin, deleteProduct)

/**
 * @swagger
 * /api/product/products-by-categorAndSubCategory:
 *   get:
 *     summary: Get products by category and subcategory
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subcategory ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     $ref: '#/components/schemas/Product'
 *                 totalCount:
 *                   type: number
 *                 totalPage:
 *                   type: number
 *       400:
 *         description: Bad request
 */
router.get(
  '/products-by-categorAndSubCategory',
  getProductByCategoryAndSubCategory
)

export default router
