const { Router }=require ("express");
const swaggerUi= require( 'swagger-ui-express')
const swaggerDocument=  require('../swagger.json' )
const SwaggerRoutes= Router()

SwaggerRoutes.use('/',swaggerUi.serve)
SwaggerRoutes.get('/',swaggerUi.setup(swaggerDocument))

module.exports= SwaggerRoutes