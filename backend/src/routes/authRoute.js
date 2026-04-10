import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()


const generateToken = (userid) => {
    return jwt.sign({ userid }, process.env.SECRETE_KEY, {
        expiresIn: "1d"
    })
}

router.post('/register', async (req, res) => {

    try {

        const { username, email, password } = req.body


        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 3) {
            
            return res.status(400).json({
                massage: "username should be greater than 3 letter"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                massage: "Password should be greater than 6 letter"
            })
        }

        // const exitsUser = await User.find({$or:[{email},{username}]})

        const ExistingUser = await User.findOne({ email })

        if (ExistingUser) {
            return res.status(400).json({
                massage: "Email already exists"
            })
        }

        const ExixtsUserName = await User.findOne({ username })

        if (ExixtsUserName) {
            return res.status(400).json({
                massage: "Username already exists"
            })
        }

        const profileImage = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`

        const user = new User({
            username,
            email,
            password,
            profileImage,

        })

        await user.save()
        const token = generateToken(user._id)

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt:user.createdAt
            }
        })

    } catch (error) {
        console.log("Error in the Register Route", error);
        return res.status(500).json({
            massage: "Error in the Register Route"
        })
    }

})

router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                massage:"All Fields are required"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                massage:"user not exits"
            })
        }

        const isPasswordCorrect = await user.compairPassword(password)
        if(!isPasswordCorrect) return res.status(400).json({
            massage:"Invalid credentials"
        })

        const token = generateToken(user._id)

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt:user.createdAt
            }
        })

    } catch (error) {
        console.log("Error in the Register Route", error);
        return res.status(500).json({
            massage: "Error in the Register Route"
        })
    }
})


export default router