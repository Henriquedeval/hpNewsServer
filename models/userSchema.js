import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
        
    },
    avatar:{
        type:String,
        required:true,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    },
    background:{
        type:String,
        required:true,
        default:'https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png'
    },
})

userSchema.pre('save', async function(next){
    this.password= await bcrypt.hash(this.password,8)
    next()
})
const User=mongoose.model('User',userSchema)

export default User