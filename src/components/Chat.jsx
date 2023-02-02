import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AuthContext from "../context/AuthContext";
import io from 'socket.io-client';
import "../styles/Chat.css"
import sendLogo from "../images/send.png"
import Message from './Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../images/closeIcon.png"

const ENDPOINT = "https://chat-server-production-fd17.up.railway.app/"

function Chat() {
  let [messages, setMessages] = useState([])
  let [id, setId] = useState("")
  const { user } = useContext(AuthContext);

  const socket = io(ENDPOINT, { transports: ['websocket'] })
  const send = () => {
    let message = document.getElementById('chatInput').value;
    socket.emit("message", { message, id })
    document.getElementById('chatInput').value = "";
  }
  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected")
      socket.emit('joined', { user: user })
      setId(socket.id)
    })
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return () => {
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    return () => {
      socket.off()
    }
  }, [messages])
  console.log(messages);
  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'>
          <h2>C CHAT</h2>
          <a href="/"> <img src={closeIcon} alt="Close"/></a>
        </div>
        <ReactScrollToBottom className='chatBox'>
          {
            messages.map((item, i) => {
              return <Message message={item.message} user={item.id === id ? "" : item.user} classs={item.id === id ? "right" : "left"} key={i} />
            })
          }
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input type="text" id='chatInput' />
          <button className='sendBtn' onClick={send}><img src={sendLogo} alt="send" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat