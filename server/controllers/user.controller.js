import UserModel from '../models/user.model.js'
import sendEmail from '../config/sendEmail.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import uploadImageClodinary from '../utils/uploadImage.js'
import generatedOtp from '../utils/generateOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import generatePassword from '../utils/generatePassword.js'

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      })
    }

    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(400).json({
        message: 'Email is already registered',
        error: true,
        success: false,
      })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`

    await sendEmail({
      sendTo: email,
      subject: 'Verify your email from Hnouti.Tn',
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    })

    return res.status(201).json({
      message: 'User registered successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function verifyEmail(req, res) {
  try {
    const { code } = req.body

    const user = await UserModel.findOne({ _id: code })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid verification code',
        error: true,
        success: false,
      })
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    )

    return res.status(200).json({
      message: 'Email verified successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not register', error: true, success: false })
    }

    if (user.status !== 'Active') {
      return res.status(400).json({
        message: 'Your account is not active',
        error: true,
        success: false,
      })
    }
    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'wrong password !', error: true, success: false })
    }
    const accessToken = await generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id)

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    })

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }

    res.cookie('accessToken', accessToken, cookiesOption)
    res.cookie('refreshToken', refreshToken, cookiesOption)

    return res
      .status(200)
      .json({ message: 'Login successfully', error: false, success: true })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function signout(req, res) {
  try {
    const userId = req.userId  // req.userId is coming from the middleware
    
    if (!userId) {
      return res.status(400).json({
        message: 'Invalid request: User ID is missing',
        error: true,
        success: false,
      })
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    }

    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)

    const updateResult = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: '',
    })

    if (!updateResult) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      })
    }

    res.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    res.set('Surrogate-Control', 'no-store')

    return res.status(200).json({
      message: 'Signout successful',
      error: false,
      success: true,
    })
  } catch (error) {
    console.error('Signout Error:', error)
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Email is not registered',
        error: true,
        success: false,
      })
    }
    const otp = generatedOtp()
    const expireTime = new Date().getTime() + 10 * 60 * 1000

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    })

    await sendEmail({
      sendTo: email,
      subject: 'Forgot Password from Hnouti.Tn',
      html: forgotPasswordTemplate({
        name: user.name,
        otp,
      }),
    })
    return res
      .status(200)
      .json({ message: 'Email sent successfully', error: false, success: true })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Email is not registered',
        error: true,
        success: false,
      })
    }
    const currentTime = new Date().toISOString()

    if (user.forgot_password_expiry < currentTime) {
      return res
        .status(400)
        .json({ message: 'OTP is expired', error: true, success: false })
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }
    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: '',
      forgot_password_expiry: '',
    })
    return res.status(200).json({
      message: 'OTP verified successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      })
    }
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Email is not registered',
        error: true,
        success: false,
      })
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password not match', error: true, success: false })
    }
    const hashedPassword = bcryptjs.hashSync(newPassword, 10)

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    })
    return res.status(200).json({
      message: 'Password reset successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(' ')[1]

    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: 'No token provided', error: true, success: false })
    }

    const verifyToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: 'Invalid token', error: true, success: false })
    }
    const usrId = verifyToken?._id
    const newAccessToken = await generateAccessToken(usrId)

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }

    res.cookie('accessToken', newAccessToken, cookiesOption)

    return res.status(200).json({
      message: 'Token refreshed successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function userDetails(req, res) {
  try {
    const userId = req.userId
    console.log(userId)

    const user = await UserModel.findById(userId).select(
      '-password -refresh_token'
    )
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found', error: true, success: false })
    }
    return res
      .status(200)
      .json({ message: 'User found', data: user, error: false })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId
    const image = req.file
    const uploadImage = await uploadImageClodinary(image)

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: uploadImage.url,
    })
    return res.status(200).json({
      message: 'Avatar uploaded successfully',
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: uploadImage.url,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export async function updateProfilUser(req, res) {
  try {
    const userId = req.userId
    const { name, email, mobile, password } = req.body

    let hashedPassword = ''

    if (password) {
      hashedPassword = bcryptjs.hashSync(password, 10)
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashedPassword }),
      }
    )

    return res.status(200).json({
      message: 'User updated successfully',
      success: true,
      error: false,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    })
  }
}

export const googleauth = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      const accessToken = await generateAccessToken(user._id)
      const refreshToken = await generateRefreshToken(user._id)
      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      res.cookie('accessToken', accessToken, cookiesOption)
      res.cookie('refreshToken', refreshToken, cookiesOption)
      return res.status(200).json({
        message: 'Login with google successfully',
        error: false,
        success: true,
      })
    } else {
      const generatepaswword = generatePassword()
      const hashedPassword = bcryptjs.hashSync(generatepaswword, 10)

      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })

      await newUser.save()

      const accessToken = await generateAccessToken(newUser._id)
      const refreshToken = await generateRefreshToken(newUser._id)

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      res.cookie('accessToken', accessToken, cookiesOption)
      res.cookie('refreshToken', refreshToken, cookiesOption)

      return res.status(200).json({
        message: 'Login with google successfully',
        error: false,
        success: true,
      })
    }
  } catch (error) {
    console.error('Error in googleauth:', error)
    return res.status(500).json({
      message: 'Error while login with google',
      error: true,
      success: false,
    })
  }
}
