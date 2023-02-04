import { isValidObjectId } from "mongoose"
import { findUserById } from "../services/userServices.js"

export const userIdValidation= async(req,res,next)=>{
try{
    const{id}=req.params
    if(isValidObjectId(id)===false){
        return res.status(403).json({message:"invalid id"})
    }
    const user= await findUserById(id)
    if(!user){
        return res.status(404).json({message:"user do not exists"})
    }
return next()
}
    catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}