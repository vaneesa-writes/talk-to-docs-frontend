// ChatMessage.js
import React from 'react';

function ChatMessage({ message }) {
  return (
    <div className={`mb-2 ${message.isResponse ? '' : 'text-right'}`}>
      <p className={`rounded-lg inline-block p-2 ${message.isResponse ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
        {message.text}
      </p>
      {message.isResponse && (
        <p className="text-xs text-gray-500">{message.sender}</p>
      )}
    </div>
  );
}

export default ChatMessage;
