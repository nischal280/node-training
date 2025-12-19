const mongoose = require("mongoose") 
async function dbConnect(){
   await mongoose.connect("mongodb+srv://nischal280:nischal280@cluster0.c1okhbd.mongodb.net/?appName=Cluster0")
   console.log("DB connected succesfully !!!")
}

module.exports = dbConnect