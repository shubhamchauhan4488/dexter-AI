import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import './Chatbot.css';

const HTTP_ENDPOINT = "http:/localhost:3000/";

const Chatbot = ({ isOpen }) => {
  const [messages, setMessages] = useState([{
    text: `Hello! 👋 Welcome to our chatbot. I'm here to help you with any questions you have. Don't hesitate to ask!`,
    sender: 'bot'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

      try {
        console.log('inputValue', inputValue)
        setMessages([...messages, { text: inputValue, sender: 'user' }]);

        setIsLoading(true)
        const resData = await sendPrompt(inputValue);
        // after some time elapsed in getting response from the server, remove loader
        setIsLoading(false)
        // console.log('resData', resData)
        setMessages([...messages, { text: inputValue, sender: 'user' }, { text: resData, sender: 'bot' }]);

      } catch (error) {
        console.error("Failed to fetch response. Please try again.", error);
      }

      setInputValue('');
    }
  };

  return (
    <>
      <div className={`chatbot-window ${isOpen ? 'opened' : ''}`}>
        <div className="messages-wrapper">
          {messages.map((message, index) => {
            return (
              <>
                {message.sender === 'bot' ? <img src='https://assets-global.website-files.com/65e19b51fe32177a4c37ba56/65eb228dc4334c00f6d0a836_hero%20robot.webp' width={40} height={50} /> : <></>}
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              </>
            )
          }
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="input-wrapper">
          {isLoading ?
            <div className='loader'>
              <DotLottiePlayer
                src="https://lottie.host/56dab41a-2480-43f4-917a-66d59f95657c/Xju6Ki0jL2.json"
                autoplay
                loop
              />
            </div>
            :
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a question..."
              />
              <button onClick={handleSendMessage}>
                <svg
                  class="send-button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              </button>
            </>}
        </div>
      </div>
    </>
  );
};

export default Chatbot;