import { Router } from "express"
import { create, destroy, getAllUsers, getUser, update } from "../controllers/userController.js"
import { authToken } from "../middlewares/authMiddleware.js"
import { userIdValidation } from "../middlewares/userMiddleware.js"

const userRoutes=Router()
//Post Routes
userRoutes.post('/users/create',create)
//Post Routes
//
//Get Routes
userRoutes.get('/users/',authToken,getAllUsers)
userRoutes.get('/users/:id/profile',authToken,userIdValidation,getUser)
//Get Routes
//
//Put/Patch Routes
userRoutes.put('/users/update',authToken, update)
//Put/Patch Routes
//
//Delete Routes
userRoutes.delete('/users/delete',authToken,destroy)
//Delete Routes

export default userRoutes