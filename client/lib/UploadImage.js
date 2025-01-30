import Axios from './Axios'
import GlobalApi from '@/api/GlobalApi'

const UploadImage = async (image) => {
  try {
    
    const formData = new FormData()

    formData.append('image', image)
    
    const response = await Axios({
      ...GlobalApi.UploadImage,
      data: formData,
    })
    
    return response
  
} catch (error) {
    return error
  }
}

export default UploadImage
