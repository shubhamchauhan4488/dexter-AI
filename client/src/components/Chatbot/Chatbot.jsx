import React, { useState, useRef, useEffect } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import './Chatbot.css';
import { sendPrompt } from '../../api/chatbot';
import Error from '../Error/Error';

const Chatbot = ({ isOpen }) => {
  const [messages, setMessages] = useState([{
    text: `Hello! 👋 Welcome to the AI chatbot. I'm here to help you with any questions you have. Don't hesitate to ask!`,
    sender: 'bot'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef(null);

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
        setError(error?.message || error);
        setTimeout(() => setError(''), 8000); //auto clear after 5 sec
        setIsLoading(false);
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
        {error != '' && <Error message={error} />}
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
                  className="send-button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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