const express = require("express")
const path = require("path")
const productsRouter = require("./routes/views/products")
const productsApiRouter = require("./routes/api/products")
const authApiRouter = require('./routes/api/auth')
const boom = require('@hapi/boom')
const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middleware/errorHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

//app
const app =express()

//middlewares
app.use(express.json())

//static content
app.use("/static", express.static(path.join(__dirname,"public")))

//routes
app.use("/products",productsRouter)
productsApiRouter(app)
app.use("/api/auth", authApiRouter)

//view engine setup
app.set("views", path.join(__dirname,"views"))
app.set("view engine","pug")

//redirect
app.get("/", function(req,res){
    res.redirect("/products")
})

app.use(function(req,res,next) {
    if (isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()

        res.status(statusCode).json(payload)
    }

    res.status(404).render('404')
})

//errorsHandler
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

//server
const server = app.listen(3000, function(){
    console.log(`Listening in http://localhost:${server.address().port}`)
})