var express = require('express');
const { promptBank } = require('../public/data/questionBank');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://5cf64011fb144303be27b23c78b0e8b8.us-central1.gcp.cloud.es.io:443',
  cloud: {
    id: 'CLOUD_ID'
  },
  auth: {
    apiKey: 'API_KEY'
  }
});


// router.post('/create', async function (req, res, next) {
//   console.log('creating question bank')

//   try {
//     await client.index({
//       index: 'dexter',
//       body: [
//         {
//           "id": 1,
//           "prompt": "What is the capital of France?",
//           "answer": "The capital of France is Paris."
//         },
//         {
//           "id": 2,
//           "prompt": "Who is the author of 'To Kill a Mockingbird'?",
//           "answer": "The author of 'To Kill a Mockingbird' is Harper Lee."
//         },
//         {
//           "id": 3,
//           "prompt": "What is the tallest mountain in the world?",
//           "answer": "Mount Everest is the tallest mountain in the world."
//         },
//         {
//           "id": 4,
//           "prompt": "What is the boiling point of water?",
//           "answer": "The boiling point of water is 100 degrees Celsius (212 degrees Fahrenheit)."
//         },
//         {
//           "id": 5,
//           "prompt": "Who painted the Mona Lisa?",
//           "answer": "The Mona Lisa was painted by Leonardo da Vinci."
//         },
//         {
//           "id": 6,
//           "prompt": "What is the capital of Italy?",
//           "answer": "The capital of Italy is Rome."
//         },
//         {
//           "id": 7,
//           "prompt": "What is the largest mammal on Earth?",
//           "answer": "The largest mammal on Earth is the blue whale."
//         },
//         {
//           "id": 8,
//           "prompt": "Who discovered the theory of relativity?",
//           "answer": "The theory of relativity was discovered by Albert Einstein."
//         },
//         {
//           "id": 9,
//           "prompt": "What is the chemical symbol for gold?",
//           "answer": "The chemical symbol for gold is Au."
//         },
//         {
//           "id": 10,
//           "prompt": "Who wrote 'Romeo and Juliet'?",
//           "answer": "The play 'Romeo and Juliet' was written by William Shakespeare."
//         },
//         {
//           "id": 11,
//           "prompt": "What is the currency of Japan?",
//           "answer": "The currency of Japan is the Japanese yen."
//         },
//         {
//           "id": 12,
//           "prompt": "Who was the first person to step on the Moon?",
//           "answer": "The first person to step on the Moon was Neil Armstrong."
//         },
//         {
//           "id": 13,
//           "prompt": "What is the longest river in the world?",
//           "answer": "The longest river in the world is the Nile River."
//         },
//         {
//           "id": 14,
//           "prompt": "Who painted 'Starry Night'?",
//           "answer": "'Starry Night' was painted by Vincent van Gogh."
//         },
//         {
//           "id": 15,
//           "prompt": "What is the speed of light?",
//           "answer": "The speed of light in a vacuum is approximately 299,792 kilometers per second (186,282 miles per second)."
//         },
//         {
//           "id": 16,
//           "prompt": "What year did World War II end?",
//           "answer": "World War II ended in 1945."
//         },
//         {
//           "id": 17,
//           "prompt": "Who invented the telephone?",
//           "answer": "The telephone was invented by Alexander Graham Bell."
//         },
//         {
//           "id": 18,
//           "prompt": "What is the largest organ in the human body?",
//           "answer": "The largest organ in the human body is the skin."
//         },
//         {
//           "id": 19,
//           "prompt": "Who composed 'Für Elise'?",
//           "answer": "'Für Elise' was composed by Ludwig van Beethoven."
//         },
//         {
//           "id": 20,
//           "prompt": "What is the chemical symbol for oxygen?",
//           "answer": "The chemical symbol for oxygen is O."
//         }
//       ]
//     })
//   } catch (err) {
//     console.error('Error indexing document:', err);

//   }
// })

router.post('/', async function (req, res, next) {
  console.log('getting answer from question bank')

  const { prompt : userPrompt } = req.body
  console.log('userPrompt', userPrompt)
  try {
    // Let's start by indexing some data
    // await client.index({
    //   index: 'game-of-thrones',
    //   body: [
    //     {
    //       "id": 1,
    //       "prompt": "What is the capital of France?",
    //       "answer": "The capital of France is Paris."
    //     },
    //     {
    //       "id": 2,
    //       "prompt": "Who is the author of 'To Kill a Mockingbird'?",
    //       "answer": "The author of 'To Kill a Mockingbird' is Harper Lee."
    //     },
    //     {
    //       "id": 3,
    //       "prompt": "What is the tallest mountain in the world?",
    //       "answer": "Mount Everest is the tallest mountain in the world."
    //     },
    //     {
    //       "id": 4,
    //       "prompt": "What is the boiling point of water?",
    //       "answer": "The boiling point of water is 100 degrees Celsius (212 degrees Fahrenheit)."
    //     },
    //     {
    //       "id": 5,
    //       "prompt": "Who painted the Mona Lisa?",
    //       "answer": "The Mona Lisa was painted by Leonardo da Vinci."
    //     },
    //     {
    //       "id": 6,
    //       "prompt": "What is the capital of Italy?",
    //       "answer": "The capital of Italy is Rome."
    //     },
    //     {
    //       "id": 7,
    //       "prompt": "What is the largest mammal on Earth?",
    //       "answer": "The largest mammal on Earth is the blue whale."
    //     },
    //     {
    //       "id": 8,
    //       "prompt": "Who discovered the theory of relativity?",
    //       "answer": "The theory of relativity was discovered by Albert Einstein."
    //     },
    //     {
    //       "id": 9,
    //       "prompt": "What is the chemical symbol for gold?",
    //       "answer": "The chemical symbol for gold is Au."
    //     },
    //     {
    //       "id": 10,
    //       "prompt": "Who wrote 'Romeo and Juliet'?",
    //       "answer": "The play 'Romeo and Juliet' was written by William Shakespeare."
    //     },
    //     {
    //       "id": 11,
    //       "prompt": "What is the currency of Japan?",
    //       "answer": "The currency of Japan is the Japanese yen."
    //     },
    //     {
    //       "id": 12,
    //       "prompt": "Who was the first person to step on the Moon?",
    //       "answer": "The first person to step on the Moon was Neil Armstrong."
    //     },
    //     {
    //       "id": 13,
    //       "prompt": "What is the longest river in the world?",
    //       "answer": "The longest river in the world is the Nile River."
    //     },
    //     {
    //       "id": 14,
    //       "prompt": "Who painted 'Starry Night'?",
    //       "answer": "'Starry Night' was painted by Vincent van Gogh."
    //     },
    //     {
    //       "id": 15,
    //       "prompt": "What is the speed of light?",
    //       "answer": "The speed of light in a vacuum is approximately 299,792 kilometers per second (186,282 miles per second)."
    //     },
    //     {
    //       "id": 16,
    //       "prompt": "What year did World War II end?",
    //       "answer": "World War II ended in 1945."
    //     },
    //     {
    //       "id": 17,
    //       "prompt": "Who invented the telephone?",
    //       "answer": "The telephone was invented by Alexander Graham Bell."
    //     },
    //     {
    //       "id": 18,
    //       "prompt": "What is the largest organ in the human body?",
    //       "answer": "The largest organ in the human body is the skin."
    //     },
    //     {
    //       "id": 19,
    //       "prompt": "Who composed 'Für Elise'?",
    //       "answer": "'Für Elise' was composed by Ludwig van Beethoven."
    //     },
    //     {
    //       "id": 20,
    //       "prompt": "What is the chemical symbol for oxygen?",
    //       "answer": "The chemical symbol for oxygen is O."
    //     }
    //   ]
    // })
    // await client.index({
    //   index: 'game-of-thrones',
    //   document: {
    //     character: 'Daenerys Targaryen',
    //     quote: 'I am the blood of the dragon.'
    //   }
    // })
    // await client.index({
    //   index: 'game-of-thrones',
    //   // here we are forcing an index refresh,
    //   // otherwise we will not get any result
    //   // in the consequent search
    //   refresh: true,
    //   document: {
    //     character: 'Tyrion Lannister',
    //     quote: 'A mind needs books like a sword needs a whetstone. '
    //   }
    // })

    // Let's search!
    // if record already exists, do not create it
    const result = await client.search({
      index: 'dexter',
      query: {
        "match_phrase": {
          "prompt": userPrompt
        }
      }
    })

    if(result?.hits?.hits?.length > 0){
      console.log('result hits', result.hits.hits) // first maatching answer
      console.log('result', result.hits.hits[0]) // first maatching answer
      res.status(200).send(result.hits.hits[0]?._source.answer)    
    }else{
      // do the openai call 
      const obj = promptBank.find(item => item.prompt.includes(userPrompt)) // this will be done by openai
      console.log('obj', JSON.stringify(obj))

      // write to the elastic db
      await client.index({
        index: 'dexter',
        refresh: true,
        document: {
          prompt: obj.prompt,
          answer: obj.answer
        }
      })

      res.status(200).send(obj.answer)    
      // console.log('Document indexed successfully:', response);
    }
  
  } catch (error) {
    console.error('Error searching document:', error);
  }

});

module.exports = router;
