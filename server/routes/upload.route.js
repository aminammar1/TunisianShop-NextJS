import express from 'express'
import auth from '../middleware/auth.js'
import uploadImage from '../controllers/uploadImage.controller.js'
import upload from '../middleware/multer.js'

const router = express.Router()

/**
 * @swagger
 * /api/upload/upload-image:
 *   post:
 *     summary: Upload an image file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "https://res.cloudinary.com/example/image/upload/v123456789/sample.jpg"
 *       400:
 *         description: Bad request - No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error during upload
 */
router.post('/upload-image', auth, upload.single('image'), uploadImage)

export default router
