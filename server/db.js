// const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
// mongoose.connect(process.env.DB_CONNECT)
// .then(()=> console.log("Database connected"))
// .catch(err => console.log(err))

// module.exports=mongoose;


const mongoose=require("mongoose");
var mongoURL='mongodb+srv://rk2505152:user123@cluster0.xvscmpg.mongodb.net/taskdb'
mongoose.connect(mongoURL,{useUnifiedTopology:true , useNewUrlParser:true} );
var connection=mongoose.connection
connection.on('error',()=>{
          console.log("mongo db connection failed");
})
connection.on('connected',()=>{
          console.log("mongo db connection succesfully");
})
module.exports=mongoose;