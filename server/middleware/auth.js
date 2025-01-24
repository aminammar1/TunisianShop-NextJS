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
        error: true,
        success: false,
      })
    }

    req.userId = decode.id

    next()
  } catch (error) {
    return res.status(500).json({
      message: 'You have not signin yet',
      error: true,
      success: false,
    })
  }
}

export default auth
