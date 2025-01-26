import CategoryModel from '../models/category.model.js'
//import SubCategoryModel from '../models/subCategory.model.js'
//import productModel from '../models/product.model.js'

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
        message: 'Category not added',
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
