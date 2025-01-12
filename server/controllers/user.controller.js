import UserModel from '../models/user.model.js'
import sendEmail from '../config/sendEmail.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
//import uploadImageClodinary from "../utils/uploadImage.js";
import generatedOtp from '../utils/generateOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'

// signup controller
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'Email is already registered' })
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

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error' })
  }
}

// verify email controller
export async function verifyEmail(req, res) {
  try {
    const { code } = req.body

    const user = await UserModel.findOne({ _id: code })

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' })
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    )

    return res.status(200).json({ message: 'Email verified successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error' })
  }
}

// login controller

export async function signin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    if (user.status !== 'Active') {
      return res.status(400).json({ message: 'Your account is not active' })
    }
    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'wrong password !' })
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

    return res.status(200).json({ message: 'Login successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error' })
  }
}

// logout controller

export async function signout(req, res) {
  try {
    const userid = req.userId // from middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }
    res.clearCookie('accessToken', cookiesOption)
    res.clearCookie('refreshToken', cookiesOption)

    const deleteRrefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refreshToken: '',
    })
    return res.status(200).json({ message: 'signout successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error' })
  }
}
