import httpCode from "../constants/index.js"
import { v4 as uuidv4 } from "uuid"
import bcrypt from 'bcrypt'
import prisma from "../lib/prisma.js"
import jwt from 'jsonwebtoken'


const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role},
        process.env.JWT_ACCESS_TOKEN,
        {expiresIn: '15m'}
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role},
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: '7d'}
    )
}

const Authentification = {
    Login : async (req, res) => {
        try {
            const {email, password} = req.body

            if (!email || !password) {
                return res.status(httpCode.BAD_REQUEST).json({message: 'enter all fields'})
            }

            const user = await prisma.user.findUnique({where: {email}})

            // password compare with bcrypt
            const verifiedPassword = bcrypt.compare(password, user.password)

            if (!verifiedPassword) {
                return res.status(httpCode.NOT_FOUND).json({message: 'wrong password'})
            }

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            await prisma.Users.update({
                where: {id: user.id},
                data: {refreshToken}
            })

            return res.status(httpCode.OK).json({
                message: 'successfully connected',
                token: accessToken, refreshToken,
                user: {id: user.id}, email: user.email, role: user.role
            })
            
        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    }
}

export default Authentification