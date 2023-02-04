import { Router } from "express";
import { login } from "../controllers/loginController.js";

const loginRoutes= Router()

loginRoutes.post('/login',login)

export default loginRoutes