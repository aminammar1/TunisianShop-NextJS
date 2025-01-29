import express from 'express';

import {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem
} from '../controllers/cart.controller.js';

import auth from '../middleware/auth.js';


const router = express.Router();


router.post('/add-cart', auth, addToCart);
router.get('/get-cart', auth, getCart);
router.put('/update-cart', auth, updateCartItem);
router.delete('/delete-cart', auth, deleteCartItem);


export default router;
