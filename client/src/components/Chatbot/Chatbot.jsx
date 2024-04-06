import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import axios from 'axios'
import { DotLottiePlayer } from '@dotlottie/react-player';
import reactImg from './../../assets/react.svg';

const HTTP_ENDPOINT = "http:/localhost:3000/";

const Chatbot = ({ isOpen }) => {
  const [messages, setMessages] = useState([{
    text: `Hello! 👋 Welcome to our chatbot. I'm here to help you with any questions you have. Don't hesitate to ask!`,
    sender: 'bot'
  }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        const resData = await sendPrompt(inputValue);
        setIsLoading(false)
        // setTimeout(() => {

        // }, 5000)
        console.log('resData', resData)
        console.log('messages befpore', messages)

        setMessages([...messages, { text: inputValue, sender: 'user' }, { text: resData, sender: 'bot' }]);

      } catch (error) {
        console.error("Failed to fetch response. Please try again.", error);
      }

      setInputValue('');
    }
  };

  // console.log('messages', messages)
  return (
    <>
      <div className={`chatbot ${isOpen ? 'opened' : ''}`}>
        <div className="messages-wrapper">
          {messages.map((message, index) => {
            // console.log('message', message)
            return (
              <>
                {message.sender === 'bot' ? <img src='https://assets-global.website-files.com/65e19b51fe32177a4c37ba56/65eb228dc4334c00f6d0a836_hero%20robot.webp' width={40} height={50}/>: <></>}
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
              <button onClick={handleSendMessage}>Ask</button>
            </>}


        </div>
      </div>
      {/* </div> */}

    </>

  );
};

export default Chatbot;