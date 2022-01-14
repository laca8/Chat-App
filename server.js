const express = require('express')
const router = require('./router')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users') 
io.on('connection',(socket)=>{
  console.log('new user connection');
  socket.on('join',({name,room},callback)=>{
       const {error,user} = addUser({id:socket.id,name,room})
       if(error) return callback(error)
       socket.join(user.room)
       
       socket.emit('message',{user:'admin',text:`${user.name},welcome to ${user.room}`})
       callback()
  })
  socket.on('sendMessage',(message,callback)=>{
    const user = getUser(socket.id)
    io.to(user.room).emit('message',{user:user.name,text:message})
    callback()
  })
  
  socket.on('disconnect',()=>{
      const user = removeUser(socket.id)
      if(user){
        io.to(user.room).emit('message',{user:`admin`,text:`${user.name} has left...`})
      }
  })
})
app.use(router)
const PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
  console.log(`server running at port ${PORT}`);
})
