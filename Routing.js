var express=require('express')
var router=express.Router()

router.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})
router.get('/about',function(req,res){
    res.sendFile(__dirname+"/about.html")
})
router.get('/drums',function(req,res){
    res.sendFile(__dirname+"/drums.html")
})
router.get('/piano',function(req,res){
    res.sendFile(__dirname+"/piano.html")
})
router.get('/wind',function(req,res){
    res.sendFile(__dirname+"/wind.html")
})
router.get('/signup',function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
router.get('/login',function(req,res){
    res.sendFile(__dirname+"/login.html")
})

module.exports=router;