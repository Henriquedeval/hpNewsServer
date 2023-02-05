import { Router } from "express";
const swaggerUi= require( 'swagger-ui-express')
const swaggerDocument=  require('../swagger.json' )
const SwaggerRoutes= Router()

SwaggerRoutes.use('/',swaggerUi.serve)
SwaggerRoutes.get('/',swaggerUi.setup(swaggerDocument))

export default SwaggerRoutes