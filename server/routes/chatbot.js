var express = require('express');
var router = express.Router();
var OpenAI = require('openai');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: process.env.GCP_ELASTICSEARCH_ENDPOINT,
    cloud: {
        id: process.env.GCP_ELASTIC_CLOUD_ID,
    },
    auth: {
        apiKey: process.env.GCP_ELASTIC_CLOUD_AUTH_KEY
    }
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async function (req, res) {
    const { prompt: userPrompt } = req.body;
    try {
        // first check the Elastic db
        const result = await client.search({
            index: 'dexter',
            query: {
                "match_phrase": {
                    "prompt": userPrompt
                }
            }
        })

        if (result?.hits?.hits?.length > 0) {
            console.log('result hits', result.hits.hits) // first maatching answer
            res.status(200).send(result.hits.hits[0]?._source?.answer)
        } else {
            // make the openai call 
            // const obj = promptBank.find(item => item.prompt.includes(userPrompt)) // lets say this will be done by openai

            const completion = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: userPrompt,
                temperature: 0,
                max_tokens: 200,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            console.log('completion.choices[0]', completion.choices[0])
            const openAIresponseObj = {
                prompt: userPrompt,
                answer: completion.choices[0].text
            }

            // write to the elastic db
            await client.index({
                index: 'dexter',
                refresh: true,
                document: {
                    prompt: openAIresponseObj.prompt,
                    answer: openAIresponseObj.answer
                }
            })
            res.status(200).send(openAIresponseObj.answer)
        }
    } catch (error) {
        console.error("Error fetching completion:", error);
        res.status(500).send("Failed to fetch response from OpenAI.");
    }
});



module.exports = router;
