var express = require('express');
const path = require('path');
var app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));

//routing class pages
app.set('view engine', 'ejs')

app.get('/', function(req, res){
//  res.send("Hello world! by express");
 res.render('pages/index');
});
app.use(bodyParser.json());


app.get('/abuse', function(req, res){
 res.render('pages/abuse');
});

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
    citAdvice = "Help to Claim Universal Credit If you are thinking about making a Universal Credit claim or are in the process of making a claim, we can help. Whether you're looking for answers to quick questions or step-by-step support to make your claim, our trained advisers can guide you through the process all the way to your first full and correct payment.  What is Universal Credit? Universal Credit is a government benefit payment designed to help with living costs. It's paid monthly (or twice a month for some people in Scotland), and it can be paid to people on a low income or who are out of work.  Universal Credit replaces: Housing Benefit; income-related Employment and Support Allowance (ESA); income-based Jobseeker's Allowance (JSA); Child Tax Credit; Working Tax Credit; and Income Support. The government are in the process of phasing out these six benefits and moving all claimants onto Universal Credit. You may have received a letter from DWP regarding this, this is called Managed Migration.  If you receive benefits and have been sent a letter telling you to claim Universal Credit, our Advisers can help you with this process by phoning our helpline on 0800 0232581, or by accessing our webchat service below. There are several stages involved in claiming Universal Credit, and usually it must be claimed online.  How we can help Claiming Universal Credit can involve several stages, and we're here to make them easier for you. We can help with: Quick questions - answering queries as you make your own claim Support to submit your claim - such as advice on how to set up email and bank accounts if needed, and working through claim ‘to-dos’ Support to first payment - helping you apply for additional financial support and prepare for work coach appointments Evidence checking - making sure all your claim evidence is correct Get in touch You can contact our Help to Claim advisers via telephone, webchat and we also offer video calls. Telephone: Our Help to Claim helpline number is: 0800 023 2581. Please note, our helpline is open Monday to Friday, 8am-6pm. Calls to this number are free. If you would like to request a call back from one of our trained advisers, please fill out this form with your name, contact number as well as preferred time, and we will phone you within 2 working days. Please note, the call may come from an 0800 or withheld number. Phone: 0800 0232581. you can also request a callback from  cas.org.uk/helptoclaim."
    
    const response = await axios.post(url, {
        model: 'gpt-4o-mini',
        messages: [{role: 'system', content: "you are an assistant who focuses on homelessness, your goal is to assist the end user with finding valid information to the aberdeen area. if the user mentions financial issues, you should refer to the citizens advice daata. if they mention anything mental health related, all information should be derived from the low mood data, here is the citizens advice data" + citAdvice}, 
            // {role: 'citizens advice', content: ""},
            { role: 'user', content: prompt }],
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

