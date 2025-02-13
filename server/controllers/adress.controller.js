
import AdressModel from "../models/adress.model.js";
import UserModel from "../models/user.model.js";


export const createAdress = async (req, res) => {
    try {
        const userId = req.userId  // from middleware
        const { street, city, state, zip, country, mobile } = req.body

        const newAdress = new AdressModel({
            street, city, state, zip, country, mobile, userId : userId
        })

        const savedAdress = await newAdress.save();

        const addUserAdressId = await UserModel.findByIdAndUpdate (userId, { $push: { address_details: savedAdress._id } })

        return res.status(201).json({ message: 'Adress created!' ,
            success: true ,
            error: false ,
            data: savedAdress
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error',
            success: false,
            error: true
        })
    }
}


   export const getAdress = async (req, res) => {
        try {
            const userId = req.userId  // from middleware
            
            const userAdress = await AdressModel.find({ userId: userId }).sort({ createdAt: -1 })

            return res.status(200).json({ message: 'Adress found!' ,
                success: true ,
                error: false ,
                data: userAdress
            })
            } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error',
                success: false,
                error: true
            })
        }
    }


      
        export const updateAdress = async (req, res) => { 
            try {
                const userId = req.userId  // from middleware
                const {_id , street, city, state, zip, country, mobile } = req.body

                const updatedAdress = await AdressModel.findOneAndUpdate({ _id  , userId },{ street, city, state, zip, country, mobile }, { new: true })
                
                return res.status(200).json({ message: 'Adress updated!' ,
                    success: true ,
                    error: false ,
                    data: updatedAdress
                })
            } catch (error) {
                return res.status(500).json({ message: error.message || 'Internal server error',
                    success: false,
                    error: true
                })
            }
        }



        export const deleteAdress = async (req, res) => {
            try {
                const userId = req.userId  // from middleware
                const {_id} = req.body

                const disableAdress = await AdressModel.findOneAndUpdate({_id , userId} , { status: false }, { new: true })

                return res.status(200).json({ message: 'Adress deleted!' ,
                    success: true ,
                    error: false ,
                    data: disableAdress
                });
            }  catch (error) {
                return res.status(500).json({ message: error.message || 'Internal server error',
                    success: false,
                    error: true
                })
            }
        }    


