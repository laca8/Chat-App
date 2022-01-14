import React,{useState,useEffect} from 'react'
import queryString from 'query-string' // take data from url and convert object
import io from 'socket.io-client'
import './Chat.css'
import Messages from '../Messages/Messages'
import InfoBar from '../InfoBar/InfoBar'
const ENDPBOINT = 'http://localhost:5000'
let socket;
const Chat = ({ location }) => {
   const [name,setName] = useState('')
   const [room,setRoom] = useState('')
   const [message,setMessage] = useState('')
   const [messages,setMessages] = useState([])
 
   useEffect(()=>{
    const {name,room} = queryString.parse(location.search)
    console.log(name,room);
   
     socket = io(ENDPBOINT, { transports: ['websocket', 'polling', 'flashsocket'] })
     setName(name)
     setRoom(room)
     socket.emit('join',{name,room},error=>{
       if(error){
         alert(error)
       }
     })
   },[ENDPBOINT,location.search])
   useEffect(()=>{
       socket.on('message',message => {
         setMessages(messages => [...messages,message])
       })
   },[])
   const sendMessage = (e)=>{
     e.preventDefault()
     if(message){
       socket.emit('sendMessage',message,()=> setMessage(''))
     }
     console.log(message);
   }
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e)=> setMessage(e.target.value)}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
      </div>
    </div>
  );
}
export default Chat