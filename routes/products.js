const express = require("express")
const router = express.Router()

const products = [
    {
        name: "The name of the wind",
        price: 20,
        image: "https://images-na.ssl-images-amazon.com/images/I/91rbeet8F-L.jpg"
    },
    {
        name: "A wise man fear",
        price: 25,
        image: "https://images-na.ssl-images-amazon.com/images/I/81NX-69L22L.jpg"
    }
]

router.get("/", function(req,res){
    res.render("products", { products })
})

module.exports = router