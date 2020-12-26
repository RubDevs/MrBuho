const express = require("express")
const path = require("path")
const productsRouter = require("./routes/products")
const app =express()

app.use("/products",productsRouter)

app.set("views", path.join(__dirname,"views"))
app.set("view engine","pug")

const server = app.listen(3000, function(){
    console.log(`Listening in http://localhost:${server.address().port}`)
})