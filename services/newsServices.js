import News from "../models/newsSchema.js"

export const createNews=(body)=>{
return News.create(body)
}

export const findAllNews=(offset,limit)=>{
return News.find().sort({_id:-1}).skip(offset).limit(limit).populate('user')
}


export const findNewsById=(id)=>{
return News.findById({user:id}).sort({_id:-1}).populate('user')
}

export const findNewsByUser=(userId)=>{

    return News.find({user:userId})

}
export const findByNewsId=(id)=>{
return News.findById(id).populate('user')
}

export const serachByTitle=(title)=>{
    
    return News.find({title:{$regex: `${title}` || '',$options:"i"}}).sort({_id:-1}).populate('user')
}

export const findTopNews=(req,res)=>{
    return News.findOne().sort({_id:-1}).populate('user')
}

export const deleteNews=(news)=>{
    return News.deleteOne(news)
}

export const deleteLikes=(idNews,userId)=>{
    return News.findByIdAndUpdate({_id:idNews},{$pull:{likes:{userId:userId}}})
}

export const updateNews=(id,title,content,banner)=>{
 
    return News.findOneAndUpdate({_id:id},{title,content,banner},{rawResult:true})
}


export const addLikes=(idNews,userId)=>{
return News.findOneAndUpdate({_id:idNews,'likes.userId':{$nin:[userId]}},{$push:{likes:{userId:userId,created: new Date()}}})
}


export const countNews=()=>{
    return News.countDocuments()
}


export const addComents=(newsId,comment,userId)=>{
    const commentId= Math.floor( Date.now() * Math.random()).toString(36)
     return News.findOneAndUpdate({_id:newsId},{$push:{comments:{commentId,userId,comment,createdAt:new Date()}}})

}

export const removeComments=(newsId,userId,commentId)=>{
    return News.findByIdAndUpdate({_id:newsId},{$pull:{comments:{commentId,userId}}})
} 