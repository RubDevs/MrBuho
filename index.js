const express = require("express")
const path = require("path")
const productsRouter = require("./routes/products")
const productsApiRouter = require("./routes/api/products")
const app =express()

app.use("/static", express.static(path.join(__dirname,"public")))
app.use(express.json())

app.use("/products",productsRouter)
app.use("/api/products",productsApiRouter)

app.set("views", path.join(__dirname,"views"))
app.set("view engine","pug")

const server = app.listen(3000, function(){
    console.log(`Listening in http://localhost:${server.address().port}`)
})