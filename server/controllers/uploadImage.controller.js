import uploadImageClodinary from '../utils/uploadImage.js'

const uploadImage = async (req, res) => {
  try {
    const file = req.file
    const uploadImage = await uploadImageClodinary(file)

    return res.status(200).json({
      message: 'Image uploaded successfully',
      data: uploadImage,
      success: true,
      error: false,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      error: true,
      success: false,
    })
  }
}

export default uploadImage
