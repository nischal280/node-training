const express = require("express")
const app = express()

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



app.listen(3000,function(){
    console.log("server has started at port 3000")  /*
    3000= port number 
    and this function here is call back function
    127.0.0.1:3000 (Here 127.0.0.1 is the loop back path which will work same like local host)
    */
})