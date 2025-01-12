import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'unauthorized access',
      })
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if (!decode) {
      return res.status(401).json({
        message: 'unauthorized access',
      })
    }

    req.userId = decode.id

    next()
  } catch (error) {
    return res.status(500).json({
      message: 'You have not signin yet',
    })
  }
}

export default auth
