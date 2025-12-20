const mongoose =require("mongoose")
const schema= mongoose.Schema
const blogSchema = new schema({  // Here the object userSchema is created, 
    title: String,
    subtitle : String,
    description : String,
})

const consumer = mongoose.model("consumer",blogSchema)
module.exports = consumer