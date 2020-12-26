const express = require("express")
const router = express.Router()
const productsMock = require("../../utils/mocks/products")

router.get("/",function(req,res){
    const { query } = req.query

    res.status(200).json({
        data: productsMock,
        message: "products listed"
    })
})

router.get("/:productId",function(req,res){
    const { productId } = req.params

    res.status(200).json({
        data: productsMock[0],
        message: "product retrieved"
    })
})

router.post("/",function(req,res){

    res.status(201).json({
        data: productsMock,
        message: "product created"
    })
})

router.put("/:productId",function(req,res){
    const { productId } = req.params

    res.status(200).json({
        data: productsMock[0],
        message: "product updated"
    })
})

router.delete("/:productId",function(req,res){
    const { productId } = req.params

    res.status(200).json({
        data: productsMock[0],
        message: "product deleted"
    })
})

module.exports = router