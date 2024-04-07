import axios from 'axios';
import { getErrorMessage } from '../utilities/errorMessage';

export async function sendPrompt(prompt) {
    try {
        const response = await axios.post('http://localhost:3000/chatbots', { prompt });
        const { data } = response;

        if (getErrorMessage(response)) {
            throw new Error(getErrorMessage(response));
        }
        return data;
    } catch (error) {
        if (getErrorMessage(error.response)) {
            throw getErrorMessage(error.response)
        }
        throw error.message
    }
}

