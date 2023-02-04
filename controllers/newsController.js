import { createNews, findAllNews, findNewsByUser,countNews, findTopNews,
     findNewsById, serachByTitle, updateNews, findByNewsId, deleteNews,
      addLikes, deleteLikes , addComents, removeComments} from "../services/newsServices.js"


export const create=async(req,res)=>{
    try{
        
    const {title,content,banner}=req.body
console.log(req.userId)
    if(!title || !content || !banner){
        res.status(404).json({message:"submit all fields"})
    }

const newNews= await createNews({
    title,
    content,
    banner,
    user: req.userId
})
res.json(newNews)}
catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
}
}


export const getAllNews=async(req,res)=>{
  try{

    let {limit,offset}=req.query
limit=Number(limit)
offset=Number(offset)

    if(!limit){
        limit=1
    }
    if(!offset){
        offset=0  
    }

    const currentUrl=req.path
    const next= offset + limit
    const total= await countNews()
    const nextUrl= next<total ? `${currentUrl}?limit=${limit}&offset=${next}`:null
    const previus= offset - limit <0 ? null :off-limit
    const previusUrl= previus !=null? `${currentUrl}?limit=${limit}&offset=${previus}`: null
    const news= await findAllNews(offset,limit)

    if(news.length===0){
        res.status(404).json({message:"There is no news"})
    }
   return res.send({
        nextUrl,
        previusUrl,
        limit,
        offset,
        total,
        results: news.map((itens)=>(
            {
                id:itens._id,
                title:itens.title,
                content:itens.content,
                banner:itens.banner,
                likes:itens.likes,
                comments:itens.comments,
                userName:itens.user.Username,
                avatar:itens.user.avatar
            }
        ))
    })
  }
  catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
  }
}

export const showNewsByid=async(req,res)=>{

    try{
const {id}=req.params

const news= await findNewsById(id)
if(!news){
    res.status(403).json({message:"invalid news id"})
}
res.send({
    news:{
        id:news._id,
        title:news.title,
        content:news.content,
        banner:news.banner,
        likes:news.likes,
        comments:news.comments,
        userName:news.user.userName,
        userAvatar:news.user.avatar

    }
})

    }catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}

export const usersNews= async(req,res)=>{
    try{
  const id= req.userId
  console.log(id)
    const news= await findNewsByUser(id)
   if(news.length===0){
    res.status(404).json({message:"This user do not have news posted"})
   }

   return res.send({
    results: news.map((itens)=>(
        {
            id:itens._id,
            title:itens.title,
            content:itens.content,
            banner:itens.banner,
            likes:itens.likes,
            comments:itens.comments,
            userName:itens.user.Username,
            avatar:itens.user.avatar
        }
    ))
})

}catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
}
}

export const topNews=async(req,res )=>{
    try{
const news= await findTopNews()

if(!news){
    res.status(404).json({message:"No News"})
}

return res.send({
    news:{
        id:news._id,
        title:news.title,
        content:news.content,
        banner:news.banner,
        likes:news.likes,
        comments:news.comments,
        userName:news.user.userName,
        userAvatar:news.user.avatar

    }
})

    }catch(error){
console.error(error)
res.status(500).json({message:"internal server error"})
    }
}

export const searchNews= async(req,res)=>{

    try{
const {title}=req.query


const news= await serachByTitle(title)

if(news.length===0){
    res.status(404).json({message:"Theres no news with this title"})
}

return res.send({
    results: news.map((itens)=>(
        {
            id:itens._id,
            title:itens.title,
            content:itens.content,
            banner:itens.banner,
            likes:itens.likes,
            comments:itens.comments,
            userName:itens.user.Username,
            avatar:itens.user.avatar
        }
    ))
})


    }catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}


export const update=async(req,res)=>{

    try{
const{id}=req.params
const userId=req.userId
const {title,content,banner}=req.body

const news= await findByNewsId(id)

if(!news){
    res.status(404).json({message:'news do not exists'})
}

if(toString(userId)!==toString(news.user)){
    
res.status(401).json({message:"invalid id"})
}

if(!title && !content&& !banner){

    res.status(404).json({message:"submit at least one field"})
}

await updateNews(id,title,content,banner)
res.json({message:"post updated"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"internalssss server error"})
    }
}


export const updateLikes=async(req,res)=>{
    try{
const{id}=req.params
const userId=req.userId

const news= await findByNewsId(id)
if(!news){
    res.status(404).json({message:"News not found"})
}
const NewsLiked= await addLikes(id,userId)

if(!NewsLiked){
    await deleteLikes(id,userId)
    res.status(200).json({message:"like removed"})
}
res.status(201).json({NewsLiked})

    }catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}



export const destroy= async(req,res)=>{
try{
    const{id}=req.params
const userId=req.userId

const news= await findByNewsId(id)

if(!news){

    res.status(404).json({message:"News not found"})
}


if(toString(userId)!==toString(news.user)){
    
    res.status(401).json({message:"invalid id"})
    }
await deleteNews(news)
res.json({message:"News deleted"})

}
catch(error){
    console.error(error)
    res.status(500).json({message:"internal server error"})
}
} 

export const deleteComents=async(req,res)=>{
 const {id}=req.params
 const {commentId}=req.params
 const userId=req.userId
 
 const commentRemoved=await removeComments(id,userId,commentId)

 
console.log(await removeComments(id,userId,commentId))
 const commentFinder=commentRemoved.comments.find((comment)=>{return comment.commentId===commentId})

 if(commentFinder===undefined){
    res.status(404).json({message:"Comment do not exists"})
 }
 const verifyUser=String(commentFinder.userId) === String(userId)

 console.log(verifyUser)
 if( verifyUser===false){
    return res.status(401).json('wrong user')
 }

 res.send({message:"comment removed"})
}


export const updateComments= async(req,res)=>{
    try{
      const{id}=req.params
      console.log(id)
    const userId=req.userId
    console.log(userId)
    const {comment}=req.body
    if(!comment){
        res.json({message:'Type something to comment'})
    }
    await addComents(id,comment,userId)

    res.json({message:"comment created"})}
 
 
 
    catch(error){
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
 }