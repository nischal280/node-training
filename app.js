const express = require("express")
const dbConnect = require("./Data Base/connection")
const user = require("./models/userModel") // Importing data 
const consumer = require("./models/blogModel") // Importing data of blogModels from models file
const app = express()
const bcrypt = require("bcrypt")
require("dotenv").config()  // this command is written in order to keep your some part of code private so that no one can read or see it

dbConnect()


app.use(express.json()) // this command is given so that express can understand that JSON data is coming understand it

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
    const data = await user.find()   // THis is all read operation
    res.json({
        data, // same as data : data
    })
    // user.find(abc)=> if you want to find data from table
    // user.create(abc) => if you want to add/create somethng on table
    // function jaile pani async garnu parxa re bhitra ko ura lai await garnu parxa
})


app.get("/fetchUser/:id",async function(req,res){
    const id = req.params.id
    const data = await user.findById(id)
    res.json({
       data,
    })
})
app.get("/fetchBlog/:id",async function(req,res){
    const id = req.params.id
    const data = await consumer.findById(id)
    res.json({
        data,
    })
})

app.get("/fixed/:id",async function(req,res){
    const id = req.params.id
    const data = await user.findById(id).select("-password")
    res.json({
       data,
    })
})

app.get("/fixedInfo/:id",async function(req,res){ // yo ramrari check garnu yo wrong xa sayad
    // const id = req.params.id
    const data = await user.findById(id).select(["-password","__v"])
    res.json({
       data : data,
    })
})

app.patch("/updateUser/:id",async function(req,res){
    const id = req.params.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    await user.findByIdAndUpdate(id,{
        name : name,
        email : email,
        passsword : password,
    })
    res.json({
        messsage : " Updated successfully"
    })
})

app.post("/register",async function(req,res){
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    //ALTERNATIVE : const{name,email,password}=req.body , this is destruturing
    // jaile pani data yahie req.body ma awxa 
    await user.create({
        name : name,    // left side ma bhako name jaile pani user ko schema ma gayera herne tyahi hernu parxa different bhayo bhane difficult hunxa
        email : email,  // tigh side ko bhane ko mathi hami le lyako name ko value ho yadi mathi ma name ko thau ma const haha hun thiyo bhane rt side ma haha hun thiyo
        password : bcrypt.hashSync(password,10)  // password ma mongo db lai kasaile pani na herna sakos bhanera
        // pasword ko side ko number 
    })
    res.json({
        message : "user registered successfully"
    })
})

app.post("/show",async function(req,res){
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    await consumer.create({
        title:title,
        subtitle : subtitle,
        description : description,
    })
    res.json({
        message : "blog created successfully"
    })
})

app.patch("/updateBlog/:id",async function(req,res){  // updating blog data
    const id = req.params.id
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    await consumer.findByIdAndUpdate(id,{
        title:title,
        subtitle : subtitle,
        description :description,
    })
    res.json({
        messsage : " Updated successfully"
    })
})


app.delete("/del/:id",async function(req,res){
  const id =req.params.id
  console.log(id)
  await consumer.findByIdAndDelete(id)
  res.json({
    message : "Blog deleted by the id successfully"
  })
})

app.delete("/delete",async function(req,res){  // here : is important before id because to make dynamic other wise you can input only one id
        const id =req.body.id // it finds which id is given by the user
        console.log(id)
        await user.findByIdAndDelete(id)
        res.json({
            message : "User with id deleted successfully"
        })
    })

app.listen(3000,function(){
    console.log("server has started at port 3000")  /*
    3000= port number 
    and this function here is call back function
    127.0.0.1:3000 (Here 127.0.0.1 is the loop back path which will work same like local host)
    */
})
// mongodb+srv://nischal280:<db_password>@cluster0.c1okhbd.mongodb.net/?appName=Cluster0

app.post("/login", async function(req,res){
    const email=req.body.email
    const password = req.body.password
    const data = await user.findOne({email : email})
    if(!data){
        res.json({
             message : "Not registered"
        })
       
    }else{
        console.log(data.password)
        const isMatched = bcrypt.compareSync(password,data.password) // phaila j passwoard enter garxau tyo enter garne tyaspxai mathi bata compare garne password ho
          // yaha data.password gariyeko xa kina bhane mathi const data ma user.find garda kheri tyaha purai object nae awxa tyo particular id ko 
        // yesle jaile pani boolean ma answer dinxa
        //
        if(isMatched){
            res.json({
                message : "Logged in successsfully"
            })
        }else{
            res.json({
                message : "Invalid password"
            })
        }
    }
})