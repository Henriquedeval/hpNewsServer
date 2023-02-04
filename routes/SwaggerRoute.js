import { Router } from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert{type:'json'}
const SwaggerRoutes= Router()

SwaggerRoutes.use('/',swaggerUi.serve)
SwaggerRoutes.get('/',swaggerUi.setup(swaggerDocument))

export default SwaggerRoutes