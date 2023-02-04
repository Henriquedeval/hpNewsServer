import { Router } from "express";
import { getAllNews,create, usersNews, topNews,
     showNewsByid, searchNews, 
    update, destroy, updateLikes, updateComments, deleteComents } from "../controllers/newsController.js";
import { authToken } from "../middlewares/authMiddleware.js";


const NewsRoutes=Router()

//Get Routes
NewsRoutes.get('/news/tops',topNews)
//
NewsRoutes.get('/news/search',searchNews)
//
NewsRoutes.get('/news/user/news',authToken,usersNews)
//
NewsRoutes.get('/news/',getAllNews)
//
NewsRoutes.get('/news/:id/news',showNewsByid)
//
//GetRoutes
//
//Patch Routes
NewsRoutes.patch('/user/news/:id/update',authToken,update)
//
NewsRoutes.patch('/news/:id/comments',authToken,updateComments)
//
NewsRoutes.patch('/news/:id/comments/:commentId/delete',authToken,deleteComents)
//
NewsRoutes.patch('/news/:id/like',authToken,updateLikes)
//Patch Routes
//
//Post Routes
NewsRoutes.post('/news/create',authToken,create)
//Post Routes
//
//Delete Routes
NewsRoutes.delete('/user/news/:id/delete',authToken,destroy)
//Delete Routes



export default NewsRoutes 