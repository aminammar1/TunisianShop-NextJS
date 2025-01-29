import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";



    export const addToCart = async (req, res) => {
        try {
            const userId = req.userId   // from middleware auth 
            const {productId} = req.body

            if (!productId){
                return res.status(400).json({
                    message: 'Please provide the id of the product',
                    error: true,
                    success: false
                })
            }
            const product = await CartModel.findOne({productId, userId})

            if (product){
                return res.status(400).json({
                    message: 'Product already in cart',
                    error: true,
                    success: false
                })
            }
            const cartItem = new CartModel({
                quantity: 1,
                productId,
                userId
            })

            const cart = await cartItem.save()

            const updatecart = await UserModel.findByIdAndUpdate(userId, {
                $push: {
                    shopping_cart: productId
                }
            })

            return res.status(200).json({
                message: 'Product added to cart',
                success: true,
                error: false,
                data: cart
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }



    export const getCart  = async (req, res) => {
        try {
            const userId = req.userId

            const cart = await CartModel.find({userId}).populate('productId')

            return res.status(200).json({
                message: 'User cart',
                success: true,
                error: false,
                data: cart
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }



    export const updateCartItem = async (req, res) => {
        try {
            const userId = req.userId
            const {_id, quantity} = req.body

            if (!_id || !quantity){
                return res.status(400).json({
                    message: 'Please provide the product id and quantity',
                    error: true,
                    success: false
                })
            }

            const update = await CartModel.updateOne({_id, userId}, {quantity})

            return res.status(200).json({
                message: 'Cart updated',
                success: true,
                error: false,
                data: update
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }


    export const deleteCartItem = async (req, res) => {
        try {
            const userId = req.userId
            const {_id} = req.body

            if (!_id){
                return res.status(400).json({
                    message: 'Please provide the product id',
                    error: true,
                    success: false
                })
            }
            const deleteItem = await CartModel.deleteOne({_id, userId})
            return res.status(200).json({
                message: 'Item deleted',
                success: true,
                error: false,
                data: deleteItem
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }
            
