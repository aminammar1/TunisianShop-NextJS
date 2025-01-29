import express from 'express'
import {
  createProduct,
  getProducts,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  productDetails,
  updateProduct , 
  deleteProduct,
  searchProduct
} from '../controllers/product.controller.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()


router.post('/create-product', auth, admin, createProduct)
router.put('/update-product', auth, admin, updateProduct)
router.delete('/delete-product', auth, admin, deleteProduct)
router.get('/get-products', getProducts)
router.get('/products-by-category', getProductByCategory)
router.get('/products-by-categorAndSubCategory', getProductByCategoryAndSubCategory)
router.get ('/productDetails' , productDetails)
router.get ('/search-product' , searchProduct)



export default router
