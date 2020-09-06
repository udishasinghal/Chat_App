const express = require("express")
const http = require('http')
const socketio = require('socket.io')
//const bodyParser = require("body-parser")
const mongoose = require('mongoose')

var dbURL = 'mongodb+srv://admin:admin@cluster0.ucxck.mongodb.net/<dbname>?retryWrites=true&w=majority'

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

var Message = mongoose.model('Message',{
    name : String,
    message : String
})
//let messages = []

// let messages = [
//     {name : "Jong" , message : "Hello"},
//     {name : "jina" , message : "hii"},
// ]

// let idUserMap = {}

// io.on('connection',(socket)=>{
//     console.log('Connected ' + socket.id)
//     socket.on('chat',(data)=>{
//         console.log(socket.id +' says '+data.message)
//         io.emit('Chat_Received',{
//             name : idUserMap[socket.id],
//             message : data.message
//         })
//     })
// })

app.get('/messages',(req,res)=>{
    
    Message.find({},(err,messages)=>{
        res.send(messages)
    })
})

app.post('/messages',(req,res) => {
    var message = new Message(req.body)
    message.save((err)=>{
        if(err)
           sendStatus(500)


          // messages.push(req.body)
           io.emit('message',req.body)
           res.sendStatus(200)


    })
    
})

io.on('connection',(socket)=>{
    console.log('Connected ' + socket.id)
})

mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(console.log('mongoose connected'))   
.catch((err)=>  console.log(err))


port = process.env.PORT || 4321;
server.listen(port,()=>{
    console.log('Server started at http://localhost:4321')
})