import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'
const Join = () =>{
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const signHandler = (e)=>{
      if(!name || !room){
        e.preventDefault()
      }else{
        null
      }
    }
    return(
      <div className='joinOuterContainer'>
         <div className='joinInnerContainer'>
             <h1 className='heading'>Join</h1>
             <div className=''>
                 <input placeholder='name' className='joinInput' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
             </div>
             <div className=''>
                 <input placeholder='room' className='joinInput mt-20' type='text' value={room} onChange={(e) => setRoom(e.target.value)}/>
             </div>
             <Link onClick={signHandler} to={`/chat?name=${name}&room=${room}`}>
               <button className='button mt-20' type='submit'>Sign In</button>
             </Link>
         </div>
      </div>
    )
}
export default Join