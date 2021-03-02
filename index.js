const express = require("express")
const path = require("path")
const productsRouter = require("./routes/views/products")
const productsApiRouter = require("./routes/api/products")

const {
    logErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middleware/errorHandlers')

//app
const app =express()

//middlewares
app.use(express.json())

//static content
app.use("/static", express.static(path.join(__dirname,"public")))

//routes
app.use("/products",productsRouter)
app.use("/api/products",productsApiRouter)

//view engine setup
app.set("views", path.join(__dirname,"views"))
app.set("view engine","pug")

//redirect
app.get("/", function(req,res){
    res.redirect("/products")
})

//errorsHandler
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

//server
const server = app.listen(3000, function(){
    console.log(`Listening in http://localhost:${server.address().port}`)
})