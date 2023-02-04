import mongoose from "mongoose";

const connectDb=()=>{
    
    const dbLink=process.env.DB_LINK
  console.log('connecting to database....')

        mongoose.connect(dbLink,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(console.log('mongobd connected'))
        .catch(error=>console.error(error))


        
}

export default connectDb