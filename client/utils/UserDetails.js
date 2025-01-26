import Axios from '@/utils/Axios'
import GlobalApi from '@/api/GlobalApi'

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...GlobalApi.userDetails,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default fetchUserDetails
