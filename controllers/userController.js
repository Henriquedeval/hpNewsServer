import { createUser, deleteUser, findAllUsers, findUserByEmail, findUserById,updateUser } from "../services/userServices.js"

export const create= async(req,res)=>{

const {userName,email,password}=req.body

if(!userName || !email || !password){
    res.status(404).json({message:"Submit all fields"})
}
const user= await findUserByEmail(email)
if(user){
    res.status(409).json({message:"User  email already exists"})
}

const newUser= await createUser({userName,email,password})
res.status(201).json(newUser)
}






export const getUser= async(req,res)=>{
    try{
const {id}=req.params

const user= await findUserById(id)
if(!user){
    res.json({message:"user not found"})
}
res.status(200).json({
    user:{
        userName:user.userName,
        avatar:user.avatar,
        background:user.background
    }
})

    }catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}

  export const update=async (req,res)=>{
 const {userName,email,password,avatar,background}=req.body
const userId=req.userId

if(!userName && !email && !password && !avatar && !background){
    res.status(404).json({message:"Submit alt least one field"})
}

 await updateUser(userId,{userName,email,password,avatar,background})
const user= await findUserById(userId)
if(!user){
    res.status(404).json({message:"user not found"})
}
res.json({message:"User updated",user})
}


 export const destroy=async(req,res)=>{
   try{
const userId=req.userId
const user= await findUserById(userId)
if(!user){
    res.status(404).json({message:"User not found"})
}
 await deleteUser(userId)

res.status(200).json({
    message:`User deleted sucessfully`
})

   }catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
   }
}

export const getAllUsers=async (req,res)=>{
    try{
    const users= await findAllUsers()
    if(users.length===0){
        res.status(404).json({message:"theres no users"})
    }
    res.json(users)}
    catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}

