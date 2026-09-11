import httpCode from "../constants/index.js"
import { v4 as uuidv4 } from "uuid"
import bcrypt from ('bcrypt')
import prisma from "../lib/prisma.js"

const Authentification = {
    signup : async (req, res) => {
        try {
            const {id, name, email, password, role} = req.body

            if (!email || !name || !password) {
                return res.status(httpCode.BAD_REQUEST).json({message: 'enter all fields'})
            }
            // verifying if email already exist
            const emailExist = await prisma.user.findUnique({
                where : {email}
            })

            if (emailExist) {
                return res.status(httpCode.BAD_REQUEST).json({message: 'this email already exist'})
            }
            // password hashing with bcrypt
            const hashPassword = bycrpt.hash(password, 10)

            //creating new user
            const newUser = await prisma.user.create({
                data: {
                    id: uuidv4(),
                    name,
                    email,
                    password: hashPassword,
                    role: role || "USER"
                }
            })

            if (!newUser) {
                return res.status(httpCode.NO_CONTENT).json({error: 'error'})
            }

            return res.status(httpCode.CREATED).json({message: 'The user has been created successfully', newUser})
        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    }
}

export default Authentification