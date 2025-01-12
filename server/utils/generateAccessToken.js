import jwt from 'jsonwebtoken'

const generateAccessToken = async (userID) => {
  const token = jwt.sign({ id: userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '6h',
  })
  return token
}

export default generateAccessToken
