import CategoryModel from '../models/category.model.js'
import SubCategoryModel from '../models/subCategory.model.js'
import productModel from '../models/product.model.js'

export const AddCategory = async (req, res) => {
  try {
    const { name, image } = req.body

    if (!name || !image) {
      return res.status(400).json({
        message: 'Please fill all fields',
        success: false,
        error: true,
      })
    }

    const AddCategory = new CategoryModel({
      name,
      image,
    })

    const saveCategory = await AddCategory.save()

    if (!saveCategory) {
      return res.status(400).json({
        message: 'Category not saved',
        success: false,
        error: true,
      })
    }

    return res.status(200).json({
      message: 'Category added successfully',
      success: true,
      error: false,
      data: saveCategory,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    })
  }
}

  export const GetCategories = async (req, res) => {
    try {
      const data = await CategoryModel.find().sort({ createdAt: -1 })

      return res.status(200).json({
        message: 'Categories found',
        success: true,
        error: false,
        data: data,
      })

    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Internal server error',
        success: false,
        error: true,
      })
    }
  }

  export const updateCategory = async (req, res) => {
    
    try {
      const { _id, name, image } = req.body

        const update = await CategoryModel.findByIdAndUpdate(_id, {
          name,
          image,

        } , {new : true})

        return res.status(200).json({
          message: 'Category updated successfully',
          success: true,
          error: false,
          data: update,
        })

      } catch (error) {
        return res.status(500).json({
          message: error.message || 'Internal server error',
          success: false,
          error: true,
        })
      }
  }


  export const deleteCategory = async (req, res) => {
      try {
        const { _id } = req.body

        const checkSubCategory  = await SubCategoryModel.find ({id_category : {
          $in : [_id]}
        }).countDocuments()

        const checkProduct = await productModel.find ({id_category : {
          $in : [_id]}
        }).countDocuments()

        if (checkSubCategory > 0 || checkProduct > 0) {
          return res.status(400).json({
            message: 'Category has subcategories or products',
            success: false,
            error: true,
          })
        }
        const deleteCategory = await CategoryModel.findByIdAndDelete(_id)

        return res.status(200).json({
          message: 'Category deleted successfully',
          success: true,
          error: false,
          data: deleteCategory,
        })
      }
      catch (error) {
        return res.status(500).json({
          message: error.message || 'Internal server error',
          success: false,
          error: true,
        })
      }
    }


  


