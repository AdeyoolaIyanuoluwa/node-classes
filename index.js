const express = require ("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 4200
const cors = require ('cors')
app.use(cors())
app.use(express.urlencoded({extended:true})) //req.body
const userRouter = require("./routes/userRoutes")
app.use(express.json())
app.use("/", userRouter)



const http = require("http");
const { Socket, Server } = require("socket.io");

const server= http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: '*'
    }
})
let users = []
io.on('connection',(socket)=>{
    socket.on("join-socket", (_id)=>{
        const exist = users.find((each)=>each._id ===_id);
        if(exist){
            users = users.map(each=>each._id==_id?{socketId:socket.id,...each}:each)
        }else{

            users.push({_id,socketId: socket.id})
        }
    })
    console.log("user connected" + socket.id);
    socket.on("user active", (message)=>{
        console.log(message);
    })
    socket.on("send-message",(message)=>{
        socket.broadcast.emit("message-sent",message)
    })
    socket.on("join-group", (group)=>{
        socket.join(group)
    })
    socket.on("send-msg-to-group",({group,chat})=>{
        socket.to(group).emit("msg-sent-to-group", chat)
    })
})


const path = require("path")
app.set("view engine", "ejs")


const mongoose = require("mongoose")
mongoose.set ('strictQuery', true)

mongoose.connect(process.env.MONGO_URI).then(res=>{
    console.log("db Connected");
}).catch(err=>{
    console.log(err,"an error occured when connecting to db");
})


// let currentUser = user

app.use(express.static(path.join(__dirname + '/assets')))
// app.use(express.static(__dirname + '/assets'))



// app.listen(process.env.PORT, ()=>{
//     console.log('Iyanuoluwa')
// })
server.listen(process.env.PORT, ()=>{
    console.log('Iyanuoluwa')
})