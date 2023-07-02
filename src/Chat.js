import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import {io} from 'socket.io-client';


export default function Chat({name, email, URL}) {
    const [chats, setChats] = useState([]);
    const [currentChat, setCuurentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);

    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    const socket = useRef();

    useEffect(()=>{
      if(sendMessage !==null){
        socket.current.emit('send-message', sendMessage)
      }
    },[sendMessage])

    
    useEffect(()=>{
      socket.current = io('http://localhost:8800');
      socket.current.emit("new-user-add", userId);
      socket.current.on('get-users', (users) =>{
        setOnlineUsers(users);
      })
    },[name])
    
    useEffect(()=>{
      socket.current.on("recieve-message", (data)=>{
        setReceiveMessage(data)
      })
    }, []);
    
    const navigate = useNavigate();
    console.log(accessToken);
    useEffect(()=> {
        if(accessToken == null){
            navigate('/')
        }
    },[accessToken])
    useEffect(()=>{
      const getChats = async() => {
        try{
          const {data} = await axios.get(`${URL}/chat/${userId}`);
          setChats(data)
          console.log(data);
        }catch(error){
          console.logg(error);
        }
      }
      getChats();
    },[name]);

    const checkOnlineStatus = (chat) => {
      const chatMember = chat.members.find((member)=> member!== userId)
      const online = onlineUsers.find((user)=> user.userId === chatMember)
      return online? true: false
    }

  return (
    <div className='Chat'>
      <div className='Left-side-chat'>
        <div className='Chat-container'>
          <h2>
            Chats
          </h2>
          <div className='Chat-list'>
            {chats.map((chat) => (
              <div onClick={()=> setCuurentChat(chat)}>
                <Conversation data={chat} currentUserId={userId} URL={URL} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='Right-side-chat'>
        <div style={{width: '100%', alignSelf: 'center'}}>
          <div className='navIcons' style={{textAlign: 'center'}}>
            <h1>InstaChat</h1>
          </div>
          <ChatBox chat={currentChat} currentUser={userId} URL={URL} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
        </div>
      </div>
    </div>
  )
}
