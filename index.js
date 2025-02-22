var express = require('express');
const path = require('path');
var app = express();
app.use(express.static('public'));


app.get('/', function(req, res){
//  res.send("Hello world! by express");
 res.sendFile(path.join(__dirname, '/index.html'));
});

//routing class pages
app.set('view engine', 'ejs')

app.get('/abuse', function(req, res){
 res.render('pages/abuse');
});

app.post('/', async(req, res) => {

    const {prompt} = req.body;
    callOpenAI(prompt)

})
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

