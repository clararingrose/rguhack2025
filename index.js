var express = require('express');
const path = require('path');
var app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));



app.get('/', function(req, res){
//  res.send("Hello world! by express");
 res.sendFile(path.join(__dirname, '/index.html'));
});
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    console.log(req.body);
    const prompt = req.body.prompt;

    try {
        const response = await callOpenAI(prompt);
        res.json({ response: response});
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});
app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});
//test

const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;


async function callOpenAI(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const response = await axios.post(url, {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data.choices[0].message.content)
    
    return response.data.choices[0].message.content;
}

module.exports = callOpenAI;

