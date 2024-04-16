var OpenAI = require('openai');

let openAIClientInstance;

// ensuring singleton instance
function getOpenAIClient() {
    if (!openAIClientInstance) {
        openAIClientInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openAIClientInstance;
}

async function openAIcomplete({ prompt }) {
    const config = {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        temperature: 0,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    try {
        const openai = getOpenAIClient();
        const completion = await openai.completions.create({ ...config, prompt });
        return completion.choices[0].text;
    } catch (error) {
        console.error('Error performing openAI completion:', error);
        throw error;
    }
}

module.exports = { openAIcomplete }