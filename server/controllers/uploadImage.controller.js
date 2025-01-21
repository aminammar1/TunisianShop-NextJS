import uploadImageClodinary from '../utils/uploadImage.js'

const uploadImage = async (req, res) => {
  try {
    const file = req.file
    const result = await uploadImageClodinary(file)

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: result,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: error.message,
    })
  }
}

export default uploadImage
