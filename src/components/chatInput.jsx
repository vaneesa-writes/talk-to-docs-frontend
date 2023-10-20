// ChatInput.js
import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 p-2 rounded-l-lg"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-r-lg"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
