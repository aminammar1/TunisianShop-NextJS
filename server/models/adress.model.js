import mongoose from 'mongoose'

const adressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
    mobile: {
      type: String,
      default: '',
    },

    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const AdressModel = mongoose.model('adress', adressSchema)

export default AdressModel
