import jwt from "jsonwebtoken"
import 'dotenv/config'
import { findUserById } from "../services/userServices.js"

export const authToken=(req,res,next)=>{

    try{
    const{authorization}=req.headers

if(!authorization){
    res.status(401)
}
const parts=authorization.split(' ')
const [schema,token]= parts

if(parts.lenght!=2){
    res.status(401)
}

if(!schema==='bearer'){
    res.status(401).json()
}
const secret=process.env.SECRET

jwt.verify(token,secret,async(error,decoded)=>{
    if(error){
        res.status(401).json({messagr:"invalid token"})
    }
    if(decoded){

const user= await findUserById(decoded.id)

if(!user ||! user.id){
    return res.status(401).json({message:"invalid token"})
}

req.userId=user._id
res.status(200)
return next()
    }

})

}
catch(error){
    res.status(500).json({message:"internal server error"})
}
}