// Chat.js
import React, { useState, useEffect } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { useNavigate } from "react-router-dom";
import talktodoc from './utils/requests';

function Chat({ docName }) {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  
  // Simulate receiving a response from the API
  const receiveResponse = (responseText) => {
    setMessages((mess)=> [...mess, { text: responseText, isResponse: true, sender: 'Doc' }]);
  };


  const handleSendMessage = (userMessage) => {
    // Simulate sending a message to the API
    // const newUserMessage = { text: userMessage, isResponse: false, sender: 'User' };
    setMessages((mess) => [ ...mess, { text: userMessage, isResponse: false, sender: 'User' }]);
    talktodoc.docChat(docName,userMessage).then(res => {
      receiveResponse(res); 
    })

  };

  useEffect(() => {
    // Simulate the initial welcome message from ChatGPT when the chat loads.
    // receiveResponse("Welcome to the ChatGPT interface!");
    console.log(docName)
    if(docName===null)
        navigate("/upload")
    
    return async ()=>{
      await talktodoc.deleteDoc(docName)
    }

  }, []);

  return (
    <div className="flex h-screen">
      <div className=" w-3/4 p-4 bg-gray-100">
        <h2 className="text-xl mb-4">{docName}</h2>
        {/* Display chat messages */}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        {/* Chat input component */}
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
