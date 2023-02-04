import mongoose from "mongoose";

const newsSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },
    banner:{
        type:String,
        required:true,
        default:'https://i.pinimg.com/736x/20/68/07/206807f8bf5f8b96cb1ffc6e97708c71.jpg'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

    user:{
type:mongoose.Schema.Types.ObjectId,
ref:'User',
required:true
    },

    likes:{
type:Array,
required:true
    },

    comments:{
type:Array,
required:true
    }

})

const News= mongoose.model('News',newsSchema)

export default News