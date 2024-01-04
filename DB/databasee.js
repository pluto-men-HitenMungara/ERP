const mongoose = require('mongoose');

const MongoDb = async()=>{
    await mongoose.connect("mongodb://127.0.0.1/ERP")
    .then(() => {console.log("Databse connected successfully!")}) // Database connected
    .catch((error)=>{console.log(error)})  //If any Error 
}

module.exports = MongoDb  // export the Mongodb