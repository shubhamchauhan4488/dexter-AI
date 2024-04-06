import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import axios from 'axios'

const HTTP_ENDPOINT = "http:/localhost:3000/";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  async function sendPrompt(prompt) {
    try {
      const response = await axios.post('http://localhost:3000/chatbot', { prompt });
      console.log('response', response)
      return response.data;
    } catch (error) {
      console.error('frontened error', error)
    }
  
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      // setMessages([...messages, { text: inputValue, sender: 'user' }]);

      try {
        console.log('inputValue', inputValue)
        setMessages([...messages, { text: inputValue, sender: 'user' }]);
        // after some time response from the server
        const resData = await sendPrompt(inputValue);
        console.log('resData', resData)
        console.log('messages befpore', messages)

        setMessages([...messages, { text: inputValue, sender: 'user' }, { text: resData, sender: 'bot' }]);

      } catch (error) {
        console.error("Failed to fetch response. Please try again.", error);
      }
  
      setInputValue('');
    }
  };

  console.log('messages', messages)
  return (
    <div className="container">
      <div className="chatbot">
        <div className="messages-wrapper">
          {messages.map((message, index) => {
            // console.log('message', message)
            return (
              <div key={index} className={`message ${message.sender}`}>
              {message.text}
             </div>
            )
          }
          
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;