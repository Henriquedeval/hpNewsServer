import User from "../models/userSchema.js"


 export const findAllUsers= async ()=>{
 return User.find()
}
export const findUserByEmail= async (email)=>{
    return User.findOne({email:email})
   }

   export const findUserById= async (id)=>{
    return User.findById(id)
   }

   export const createUser=(body)=>{
return User.create(body)
   }

export const updateUser=(id,body)=>{
  return User.findOneAndUpdate(id,body)
}

   export const deleteUser=(user)=>{
    return User.deleteOne(user)
   }