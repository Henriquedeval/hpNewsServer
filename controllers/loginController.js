import { findUserByEmail } from "../services/userServices.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../services/authServices.js"


export const login= async(req,res)=>{
    try{
const {email,password}=req.body

if(!email || !password){
    return res.status(404).json({message:"Submit all fields"})
}

const user= await findUserByEmail(email)

if(!user){
    res.status(422).json({message:"User email or password wrong"})
}
const passdwordValidation= await bcrypt.compare(password,user.password)

if(passdwordValidation === false){
    res.status(422).json({message:"User email or password wrong"})
}
const token= generateToken(user.id)

res.json(token)}catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
}
}