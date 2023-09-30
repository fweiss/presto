// get secrets from .env file (not checked into git)
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import OpenAI from 'openai'

const configuration = {
    apiKey: process.env.OPENAI_APIKEY,
}

// might reassign to start new session
let openai = new OpenAI(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('html'))

app.post("/chat", async (req, res, next) => {
    try {
        if (!process.env.OPENAI_APIKEY) {
            throw new Error('Missing OPENAI_APIKEY in .env')
        }
        const params = req.body
        if (!params.reuseSession) {
            console.log('starting new openai session')
            openai = new OpenAI(configuration)
        }
        console.log(`temperature: ${params.temperature}`)
        const completion = await openai.chat.completions.create({
            // model: "gpt-3.5-turbo",
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Act as an a-frame programmer. I will give instructions to modify a scene. You will respond with the entire modified scene. You will not include any explanations in your responses.' },
                { role: 'user', content: params.prompt },
                { role: 'assistant', content: params.code },
             ],
            max_tokens: 1200,
            // top_p: 0.1,
            temperature: params.temperature
        });
        // console.log(completion.choices[0].message)
        res.send(completion.choices[0].message)
    }
    catch (err) {
        console.log(err)
        next(err)
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
