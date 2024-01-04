const express = require('express');
const app = express();
const MongoDb = require("./DB/databasee");
const attendanceRoute = require('./Routes/attendance.Routes');
const adminRoute = require("./Routes/admin.Routes");
const userRoute = require('./Routes/user.Routes');
const staffRoute = require("./Routes/staff.Routes");
const port = process.env.PORT || 3000;

//connecting MongoDb Database
MongoDb();
app.use(express.json()); //middleware to parse json data in the request body

//routes
app.use("/" ,userRoute);
app.use('/admin',adminRoute);
app.use('/staff',staffRoute);
app.use('/attendance',attendanceRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})