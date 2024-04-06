import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Chatbot from './components/Chatbot';

function App() {
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    const response = await axios.get('http://localhost:3000/users')
    console.log('response', response)
  }

  return (
    <>
      <Chatbot />
    </>
  )
}

export default App
