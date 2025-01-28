import ProductModel from '../models/product.model.js';


export const createProduct = async (req, res) => {
    try {
        const { name , image , id_category , id_subCategory , unit , stock , price , discount , description , more_details} = req.body
        
        if (!name || !image[0] || !id_category[0] || !id_subCategory[0] || !unit ||  !price || !discount || !description ) {
            return res.status(400).json({ message: 'Please fill in all fields' , 
                error : true , 
                 success : false 
            });
        }
        const newProduct = new ProductModel({
            name , 
            image , 
            id_category , 
            id_subCategory , 
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


