const express = require("express")
const dbConnect = require("./Data Base/connection")
const user = require("./models/userModel") // Importing data 
const app = express()

dbConnect()

app.get("/",function(req,res){
    res.send("Hello world")
})
app.get("/about",function(req,res){
    res.json({
        name:"nischal",
        address:"Biratnagar"
    }
    )
})
app.get("/fetch",async function(req,res){
    // response ma user table ma vako user data sent garnu paryo
    const data = await user.find()
    res.json({
        data, // same as data : data
    })
    // user.find(abc)=> if you want to find data from table
    // user.create(abc) => if you want to add/create somethng on table
    // function jaile pani async garnu parxa re bhitra ko ura lai await garnu parxa
})



app.listen(3000,function(){
    console.log("server has started at port 3000")  /*
    3000= port number 
    and this function here is call back function
    127.0.0.1:3000 (Here 127.0.0.1 is the loop back path which will work same like local host)
    */
})
// mongodb+srv://nischal280:<db_password>@cluster0.c1okhbd.mongodb.net/?appName=Cluster0