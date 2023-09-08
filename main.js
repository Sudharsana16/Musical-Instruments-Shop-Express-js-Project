var express=require('express')
var app=express()
var routing=require('./Routing')
app.use('/',routing)

var bodyparse=require('body-parser')
var encoder=bodyparse .urlencoded({extended:true})

var{MongoClient}=require('mongodb')
const router = require('./Routing')
var url="mongodb://0.0.0.0:27017"
var database="LoginDetails"
var client=new MongoClient(url);

app.get('/signup',function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.get('/login',function(req,res){
    res.sendFile(__dirname+"/login.html")
})

const postData=async(username,email,password,confirmpassword)=>{
    var result=await client.connect()
    var dbs=result.db(database);
    var collections=dbs.collection("userDetails")
   
    collections.insertOne({
        UserName:username,
        Email:email,
        Password:password,
        ConfirmPassword:confirmpassword
    }).then(result=>{
        console.log("Result",result)
    }).catch(err=>{
        console.error("Err",err)
    })
}

app.post('/validate',encoder,function(req,res){
    var username=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;

    postData(username,email,password,confirmpassword)
    res.send(username+" "+email+" "+password+" "+confirmpassword+" ");
})

const getData=async()=>{
    let result=await client.connect()
    let db=result.db(database)
    let collections=db.collection("userDetails")
    let response=await collections.find({}).toArray()
    return response;

}
app.get('/',function(req,res){
    const myPromise=new Promise((resolve,reject)=>{
        resolve(getData())
    })
    myPromise.then((getData)=>{ 
        res.send(getData)
    }).catch((error)=>{
        res.status(500).send("error")
    })
})
app.get('/validate', function(req, res){
    res.cookie('loginusername', '',{expires:new Date(new Date().getTime()+10000)}).send('cookie set'); //Sets name = express
 }); 

app.listen(8080)