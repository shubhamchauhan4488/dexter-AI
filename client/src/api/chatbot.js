import axios from 'axios';

export async function sendPrompt(prompt) {
    try {
        const response = await axios.post('http://localhost:3000/chatbot', { prompt });
        console.log('response', response)
        const { status, message } = response;
        if (status && status >= 400 && status < 599) {
            throw new Error('Error:', message)
        }
        return response.data;
    } catch (error) {
        throw new Error('Error while sending the Prompt to server:', error)
    }
}

