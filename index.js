const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/user")

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true})
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err))

app.use(express.json());
app.use(cors())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Video Streamer API")
})

app.listen(PORT,()=>console.log(`App started in PORT ${PORT}`));
