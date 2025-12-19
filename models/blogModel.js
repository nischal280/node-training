const mongoose =require("mongoose")
const schema= mongoose.Schema
const blogSchema = new schema({  // Here the object userSchema is created, 
    title: String,
    subtitle : String,
    description : String,
})

const user = mongoose.model("User",blogSchema)  