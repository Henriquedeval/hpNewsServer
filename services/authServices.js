import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken=(id)=>{

return jwt.sign({id:id},process.env.SECRET,{expiresIn:"7d"})
}