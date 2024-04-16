var express = require('express');
const { writeIndex, fetchByPhrase } = require('../adapters/elasticsearch');
const { openAIcomplete } = require('../adapters/openAI');
var router = express.Router();

router.post('/', async function (req, res) {
    const { prompt: userPrompt } = req.body;
    try {
        // first check the Elastic db
        const result = await fetchByPhrase({
            index: 'dexter',
            query: {
                "match_phrase": {
                    "prompt": userPrompt
                }
            }
        })

        if (result?.hits?.hits?.length > 0) {
            console.log('result hits from Elastics DB', result.hits.hits) // first maatching answer
            res.status(200).send(result.hits.hits[0]?._source?.answer)
        } else {
            // make the openai call 
            const completionText = await openAIcomplete({ prompt: userPrompt });
            const openAIresponseObj = {
                prompt: userPrompt,
                answer: completionText
            }

            // write to the elastic db
            await writeIndex({
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
