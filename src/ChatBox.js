import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'timeago.js';
import InputEmoji, { async } from 'react-input-emoji';

export default function ChatBox({chat, currentUser, URL, setSendMessage, receiveMessage}) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();

    useEffect(()=>{
        if(receiveMessage!==null && receiveMessage.chatId===chat._id){
            setMessages([...messages, receiveMessage]);
        }
    },[receiveMessage]);


    useEffect(()=>{
        const eachUserId = chat?.members.find((id)=> id !== currentUser)
        const getUserData = async()=>{
            try{
                const {data} = await axios.get(`${URL}/user/${eachUserId}`);
                setUserData(data)
            }catch(error){
                console.log(error);
            }
        }
        if(chat!==null) getUserData();
    },[chat, currentUser])

    useEffect(()=>{
        const fetchMessage = async () =>{
            try{
                const {data} = await axios.get(`${URL}/message/${chat._id}`);
                setMessages(data);
                console.log(data);
            }catch(error){
                console.log(error);
            }
        }
        if(chat !== null) fetchMessage();
    },[chat]);

    const handleChange = (newMessage) =>{
        setNewMessage(newMessage)
    }

    const handleSend = async(e)=>{
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }


        try{
            console.log("clicked", message);
            const {data} = await axios.post(`${URL}/message/`,{
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id,
            }) ;
            setMessages([...messages, data]);
            setNewMessage("");
        }catch(error){
            console.log(error)
        }

        const receiverId = chat.members.find((id => id !== currentUser));
        setSendMessage({...message, receiverId})
    }

    useEffect(()=>{
        scroll.current?.scrollIntoView({ behaviour: "smooth"});
    },[messages]);

  return (
    <>
    <div className='ChatBox-container'>
        {chat? (
            <>
            <div className='chat-header'>
                <div className='followers'>
                <div className='followers'>
                    <img
                        src='data:image/jpeg;base64,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'
                        alt="Profile"
                        className="followerImage"
                        style={{ width: "50px", height: "50px", borderRadius: '10px' }}
                    />
                    <div className="name" style={{fontSize: '0.8rem'}}>
                        <span style={{display:'flex'}}> {userData?.name}</span>
                    </div>
                </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                </div>
    
                <div className='chat-body'>
                    {messages.map((message)=>(
                        <>
                        <div ref={scroll} className={message.senderId === currentUser? "message own": "message "}>
                            <span>{message.text}</span>
                            <span>{format(message.createdAt)}</span>
                        </div>
                        </>
                    ))}
                </div>
    
                <div className='chat-sender'>
                    <div>+</div>
                    <InputEmoji
                    value = {newMessage} 
                    onChange={handleChange}/>
                    <button className='send-button button' onClick={handleSend}>Send</button>
                </div>
            </>
        ) :(
            <span className='chatbox-empty-message'>
                Tap a chat to start a conversation
            </span>
        )        
        }
    </div>
    </>
  )
}
