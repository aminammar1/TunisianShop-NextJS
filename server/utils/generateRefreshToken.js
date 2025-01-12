import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })

  const updateRefreshToken = await userModel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  )
  return token
}

export default generateRefreshToken
