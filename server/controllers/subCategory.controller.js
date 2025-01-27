import SubCategoryModel from '../models/subCategory.model.js'

export const createSubCategory = async (req, res) => {
  try {
    const { name, image, id_category } = req.body

    if (!name || !image || !id_category) {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
        success: false,
      })
    }
    const newSubCategory = new SubCategoryModel({
      name,
      image,
      id_category,
    })

    const savedSubCategory = await newSubCategory.save()

    return res.status(200).json({
      message: 'SubCategory added successfully',
      success: true,
      error: false,
      data: savedSubCategory,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    })
  }
}

export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategoryModel.find().sort({ createdAt: -1 })
    
    return res.status(200).json({
      success: true,
      error: false,
      data: subCategories,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    })
  }
}


export const updateSubCategory = async (req, res) => {
    try {
        const {_id, name, image, id_category} = req.body
        const checkSubCategory = await SubCategoryModel.findById(_id)

        if (!checkSubCategory) {
            return res.status(400).json({
                message: 'SubCategory not found',
                error: true,
                success: false,
            })
        }
        
        const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            id_category,
        }, { new: true })

        return res.status(200).json({
            message: 'SubCategory updated successfully',
            success: true,
            error: false,
            data: updatedSubCategory,
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


export const deleteSubCategory = async (req, res) => {
    try {
        const { _id } = req.body
        const checkSubCategory = await SubCategoryModel.findByIdAndDelete(_id)

        return res.status(200).json({
            message: 'SubCategory deleted successfully',
            success: true,
            error: false,
            data: checkSubCategory,
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





