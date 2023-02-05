import { Router } from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' 
const SwaggerRoutes= Router()

SwaggerRoutes.use('/',swaggerUi.serve)
SwaggerRoutes.get('/',swaggerUi.setup(swaggerDocument))

export default SwaggerRoutes