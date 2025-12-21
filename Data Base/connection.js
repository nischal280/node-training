const mongoose = require("mongoose") 
async function dbConnect(){
   await mongoose.connect(process.env.connectionString)  // aba yo secure bhayo i.e aba kasaile hamro mangoosedb ma save bhako dataherna sakdaina
   // yo lekhne tarike (process.env.(env ma j name le save xa tyo re yo bracket pani hudaina))
   console.log("DB connected succesfully !!!")
}

module.exports = dbConnect