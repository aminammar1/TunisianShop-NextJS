const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome to Hanouti.Tn!</h2>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">Dear ${name},</p>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">Thank you for registering with Hanouti.Tn. We're excited to have you on board!</p>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">To complete your registration, please verify your email address by clicking the button below:</p>
      <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #ff6600; text-decoration: none; border-radius: 4px;">
        Verify Email
      </a>
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-top: 20px;">If you did not create an account with Hanouti.Tn, please ignore this email.</p>
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-top: 20px;">Best regards,<br/>The Hanouti.Tn Team</p>
    </div>
  `
}

export default verifyEmailTemplate
