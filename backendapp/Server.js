const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path");require('dotenv').config();

// MongoDB compass connection
//const dburl = "mongodb://localhost:27017/demoproject32"
const dburl = process.env.mongodburl
const _dirname = path.resolve();
const app = express()

app.use(express.static(path.join(_dirname, "demoreactapp/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "demoreactapp", "build", "index.html"));
});
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});


// //MongoDB Atlas
// const dburl = "mongodb+srv://klu:klu@cluster0.y54xjg2.mongodb.net/demoproject32?retryWrites=true&w=majority"
// mongoose.connect(dburl).then(() => {
//     console.log("Connected to MongoDB Atlas DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


app.use(express.json()) // to parse JSON data
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
const adminrouter = require("./routes/adminroutes")
const jobseekerrouter = require("./routes/jobseekerroutes");
const recruiterrouter = require("./routes/recruiterroutes")

app.use("",adminrouter) //it includes all adminroutes 
app.use("",jobseekerrouter)//it includes all jobseekerroutes 
app.use("",recruiterrouter)//it includes all recruiterroutes 



// const port =  2032
const port = process.env.PORT || 2032
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})