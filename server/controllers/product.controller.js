import ProductModel from '../models/product.model.js';


export const createProduct = async (req, res) => {
    try {
        const { name , image , category , subCategory , unit , stock , price , discount , description , more_details} = req.body
        
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit ||  !price || !discount || !description ) {
            return res.status(400).json({ message: 'Please fill in all fields' , 
                error : true , 
                 success : false 
            });
        }
        const newProduct = new ProductModel({
            name , 
            image , 
            category , 
            subCategory , 
            unit , 
            stock , 
            price , 
            discount , 
            description , 
            more_details
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({ message: 'Product created!' , 
            success : true , 
            error : false , 
            data : savedProduct 
        });
    } catch (error) {
        return res.status(500).json({ message: error.message , 
            success : false , 
            error : true 
        });
    }
}


    export const getProducts = async (req, res) => {
        res.setHeader('Cache-Control', 'no-store')
        try {
            let { page , limit , search } = req.query;
            if (!page) {
                page = 1;
            }
            if (!limit) {
                limit = 10;
            }
            const query = search ? { name: { $regex: search, $options: "i" } } : {};
            const skip = (page - 1) * limit;
            
            const [data , total] = await Promise.all([
                ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
                ProductModel.countDocuments(query)
            ])
            
            return res.status(200).json({ message: 'Products found!' , 
                success : true , 
                error : false , 
                data : data , 
                total : total ,
                totalPages : Math.ceil(total / limit)
            });
        } catch (error) {
            return res.status(500).json({ message: error.message , 
                success : false , 
                error : true 
            });
        }
    }

    export const getProductByCategory = async (req, res) => {
        res.setHeader('Cache-Control', 'no-store');
        try {
          const { _id } = req.query;
      
          if (!_id) {
            return res.status(400).json({
              message: 'Category ID required',
              error: true,
              success: false
            });
          }
          
          const products = await ProductModel.find({ category: _id }).limit(10);
      
          if (products.length === 0) {
            return res.status(404).json({
              message: 'No products found for this category',
              success: false,
              error: true
            });
          }
      
          return res.status(200).json({
            message: 'Products found',
            success: true,
            error: false,
            data: products
          });
        } catch (error) {
          return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false,
            error: true
          });
        }
      };


    export const getProductByCategoryAndSubCategory = async (req, res) => {
        res.setHeader('Cache-Control', 'no-store')

         try { 
            const {categoryID , subCategoryID , page , limit} = req.body

            if (!categoryID || !subCategoryID){
                return res.status(400).json({
                    message: 'Please provide the id of the category and subcategory',
                    error: true,
                    success: false
                })
            }
            if (!page){
                page = 1
            }
            if (!limit){
                limit = 10
            }
            const query = { category : {$in : categoryID } , subCategory : {$in : subCategoryID } }
            const skip = (page - 1) * limit

            const [data , total] = await Promise.all([
                ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
                ProductModel.countDocuments(query)
            ])

            return res.status(200).json({
                message: 'Products found',
                success: true,
                error: false,
                data: data,
                total: total,
                totalPages: Math.ceil(total / limit)
            })
            } catch (error) {
                return res.status(500).json({
                    message: error.message || 'Internal server error',
                    success: false,
                    error: true
                })
            }
        }

    
      export const productDetails = async (req, res) => {
         try { 
            res.setHeader('Cache-Control', 'no-store');

            const {productId} = req.query

            const product = await ProductModel.findById(productId)

                if (!product){
                    return res.status(404).json({
                        message: 'Product not found',
                        success: false,
                        error: true
                    })
                }

                return res.status(200).json({
                    message: 'Product found',
                    success: true,
                    error: false,
                    data: product
                })
            }
                catch (error) {
                    return res.status(500).json({
                        message: error.message || 'Internal server error',
                        success: false,
                        error: true
                    })
                }
            }


    export const updateProduct = async (req, res) => {
        try {
            const {_id} = req.body

            if (!_id){
                return res.status(400).json({
                    message: 'Please provide the id of the product',
                    error: true,
                    success: false
                })
            }

            const updatedProduct = await ProductModel.findByIdAndUpdate(_id, req.body, {new : true})
             
                return res.status(200).json({
                    message: 'Product updated',
                    success: true,
                    error: false,
                    data: updatedProduct
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message || 'Internal server error',
                    success: false,
                    error: true
                })
            }
        }


    export const deleteProduct = async (req, res) => {
        try {
            const {_id} = req.body

            if (!_id){
                return res.status(400).json({
                    message: 'Please provide the id of the product',
                    error: true,
                    success: false
                })
            }

            const deletedProduct = await ProductModel.findByIdAndDelete(_id)
                
                    return res.status(200).json({
                        message: 'Product deleted',
                        success: true,
                        error: false,
                        data: deletedProduct
                    })
                } catch (error) {
                    return res.status(500).json({
                        message: error.message || 'Internal server error',
                        success: false,
                        error: true
                    })
                }
            }



    export const searchProduct = async (req, res) => {
        try {
            let { page , limit , search } = req.query;

            if (!page) {
                page = 1;
            }

            if (!limit) {
                limit = 10;
            }

            const query =  search ? { $text: { $search: search } } : {};
            const skip = (page - 1) * limit;

            const [data , total] = await Promise.all([
                ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
                ProductModel.countDocuments(query)
            ])

            return res.status(200).json({
                message: 'Products found',
                success: true,
                error: false,
                data: data,
                total: total,
                totalPages: Math.ceil(total / limit),
                page: page,
                limit: limit
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }
