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

const resourcesJSON = require('./mostHingedJSON.json')

async function filterJSON(categoryPASSED){
    return resourcesJSON.filter(resource => resource.category.includes(categoryPASSED));
}

app.get('/abuse', async function(req, res){
    const abuseResources = await filterJSON('Abuse');
    res.render('pages/abuse', {resources: abuseResources});
});

app.get('/employment', async function(req, res){
    const employmentResources = await filterJSON('Employment');
    res.render('pages/employment', {resources: employmentResources});
});

app.get('/finance', async function(req, res){
    const financeResources = await filterJSON('Finance');
    res.render('pages/finance', {resources: financeResources});
});

app.get('/health', async function(req, res){
    const healthResources = await filterJSON('Health');
    res.render('pages/health', {resources: healthResources});
});

app.get('/housing', async function(req, res){
    const housingResources = await filterJSON('Housing');
    res.render('pages/housing', {resources: housingResources});
});

app.post('/', async (req, res) => {
    console.log(req.body);
    const prompt = req.body.prompt;
    const role = req.body.role;

    try {
        const response = await callOpenAI(prompt, role);
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


async function callOpenAI(prompt, role) {
    const url = 'https://api.openai.com/v1/chat/completions';
    citAdvice = "Help to Claim Universal Credit If you are thinking about making a Universal Credit claim or are in the process of making a claim, we can help. Whether you're looking for answers to quick questions or step-by-step support to make your claim, our trained advisers can guide you through the process all the way to your first full and correct payment.  What is Universal Credit? Universal Credit is a government benefit payment designed to help with living costs. It's paid monthly (or twice a month for some people in Scotland), and it can be paid to people on a low income or who are out of work.  Universal Credit replaces: Housing Benefit; income-related Employment and Support Allowance (ESA); income-based Jobseeker's Allowance (JSA); Child Tax Credit; Working Tax Credit; and Income Support. The government are in the process of phasing out these six benefits and moving all claimants onto Universal Credit. You may have received a letter from DWP regarding this, this is called Managed Migration.  If you receive benefits and have been sent a letter telling you to claim Universal Credit, our Advisers can help you with this process by phoning our helpline on 0800 0232581, or by accessing our webchat service below. There are several stages involved in claiming Universal Credit, and usually it must be claimed online.  How we can help Claiming Universal Credit can involve several stages, and we're here to make them easier for you. We can help with: Quick questions - answering queries as you make your own claim Support to submit your claim - such as advice on how to set up email and bank accounts if needed, and working through claim ‘to-dos’ Support to first payment - helping you apply for additional financial support and prepare for work coach appointments Evidence checking - making sure all your claim evidence is correct Get in touch You can contact our Help to Claim advisers via telephone, webchat and we also offer video calls. Telephone: Our Help to Claim helpline number is: 0800 023 2581. Please note, our helpline is open Monday to Friday, 8am-6pm. Calls to this number are free. If you would like to request a call back from one of our trained advisers, please fill out this form with your name, contact number as well as preferred time, and we will phone you within 2 working days. Please note, the call may come from an 0800 or withheld number. Phone: 0800 0232581. you can also request a callback from  cas.org.uk/helptoclaim."
    breathingSpace1 = "What happens when you call us? Speak to us in confidence One of our specialist advisors will answer your call. You can ask to speak to a man or a woman. Our advisors are here to listen. You only need to talk when you are ready. We can offer advice and, if appropriate, let you know about help in your local area for more specific problems. You may wish to have a pen and paper handy in case the advisor gives you details of phone numbers or addresses. If your call lasts for a while that’s okay. The advisor will only bring your call to an end on feeling that you have talked through your concerns sufficiently. If you feel you would benefit from speaking more, please call again another time. Our hope is that when you phone Breathing Space you will feel listened to and respected no matter why you contact us. Always feel free to let us know the quality of the service you received. Your views are always welcome and encouraged. Our staff will listen with compassion and respect to everyone who contacts us by phone or webchat. Breathing Space asks that when you contact the service you treat our staff in the same manner. We do not tolerate abusive language or behaviour during calls or chats."
    breathingSpace2 = "Webchat lets you message our specialist advisors in real time, as an alternative to phoning us. Webchat is available: Monday to Friday, 6pm to 2am Saturday and Sunday, 4pm to 12am. this is available at breathingspace.scot. Our Breathing Space advisors are still available to contact by phone on 0800 83 85 87 if you need to talk. Calls are free and won’t show up on your bills. The Breathing Space phoneline is available 24 hours at weekends (6pm Friday tp 6am Monday), and 6pm to 2am on weekdays (Monday to Thursday). If you need mental health support out with these times, NHS 24 is available 24 hours a day, 7 days a week by calling 111. If you’re under 16 Breathing Space is for people aged 16 and over. If you’re under 16, there are other services that can provide the help you need. 111, Childline and Samaritans are free, open 24 hours a day and won’t appear on your phone bill.  111 Anyone in Scotland can phone 111 and choose the mental health option. You’ll speak to an NHS mental health adviser who can offer support and advice. They can also give you details of other services who can help you. Childline: People under 19 can confidentially phone, chat online or email about any problem big or small. You can phone them on 0800 11 11. You can also sign up for a free Childline locker (real name or email address not needed) to use their free 1-2-1 counsellor chat and email support service. Samaritans is a confidential listening service. This means you can talk through your concerns, worries and troubles. They won’t make decisions for you, or tell you what to do. You can phone them on 116 123. What should I do in a crisis or emergency? If you need immediate help, call NHS 24 on 111 or Samaritans on 116 123. You can also contact your GP. For an emergency ambulance dial 999. If you need emotional support speak to a Breathing Space advisor on 0800 83 85 87. It is open 24 hours at the weekends and from 6pm to 2am on weekdays (Mon-Thurs)."
    abz = "Our employability programmes include young people who have just left school and are unsure of their next steps, through to people with lots of experience who have been made redundant, or those who are long-term unemployed. In all cases, the service will match participants with a key worker who will support them to identify barriers they may be facing in achieving their ambitions, before working together to design an action plan of activities and training to help them reach their goals. Participants on our programmes work at their own pace and some examples of the support people can access include: 1:2:1 support from an employability keyworker. Access to money advice. Confidence building activities. Digital skills and access. CV building, job searching, application and interview techniques. Work experience and volunteering opportunities. Exploring the world of work and different sectors. Access to specific training based on individual interests and goals. Help with travel costs to get to interviews and clothes for interviews or getting started. In-work support to help settle into a new job. In addition to the service ABZ Works provides, we also work closely with other organisations across the city and can help participants access other services suited to their interests and needs. Whether someone needs support with anything from housing to financial advice, we are well placed to connect them with the support that suits them best. To find out more, get in touch! Email: abzworks@aberdeencity.gov.uk Phone: 01224 070200 (Monday to Friday 9-5pm)"
    samh = "Got a question about mental health? We can help. The SAMH Information Service provides information and support on mental health. Whether you’re seeking support, looking for more information for yourself or someone you love, or just want to have a chat about mental health, we’re here. Talk to the SAMH Information Team Here are ways you can talk to the SAMH Information Team: Live Web Chat* 0344 800 0550  info@samh.org.uk* Open 9am-6pm, Monday to Friday (except Scotland and Northern Ireland Bank Holidays). Calls charged at local rates, charges from mobile telephones vary considerably. If you need to speak to someone urgently, or require a listening or crisis service, please seek support here: www.samh.org.uk/about-mental-health/self-help-and-wellbeing/seeking-support. they also have a webchat available at https://www.samh.org.uk/informationservice"
    swf = "Apply to the Scottish Welfare Fund The Scottish Welfare Fund provides financial support if you are facing a crisis or need help to live in the community. This is normally in the form of a one-off grant to help with living costs. The fund does not cover ongoing expenses. You do not need to pay the money back. There are two kinds of grants. Crisis grants - to help meet immediate needs after an emergency or disaster. For example you can apply for things like food, heating costs, nappies, toiletries and travel. Community care grants - to help people to settle in a new home, when moving from an 'unsettled way of life' (for example hospital, prison or a homeless accommodation unit). They can also support families who are facing exceptional pressure. For example you can apply for things like furniture or carpets. We award grants based on your situation. We only receive a limited amount of money from the Government each year, so we can only provide small grants. We normally cannot give you more than 3 grants in any 12 month period unless there are exceptional circumstances.  Crisis and Community care grants Who can apply for a grant You can apply for a grant if you: are over 16 years old have a low income or do not have access to your money You can apply for a community care grant if you have savings of less than £700 (£1200 if you're over the age for pension credit). How to apply You can apply online at this link: https://lwa.financialassessments.co.uk/OnlineApplication/(S(of4urt1ieiwdrevpocnphmyf))/Introduction.aspx?form=LWAFULL&time=638758518284633236,1740255028859, https://www.aberdeencity.gov.uk/services/benefits-and-advice/apply-scottish-welfare-fund . You can also apply by calling the Scottish Welfare Fund application line on 0800 03 04 713, from 9am to 5pm.  We will ask you for proof of your identity and your circumstances. For this we will check the information held on our records and we may contact other organisations in connection with your circumstances. We will contact you if we need more information."

    if(role == "user"){
        
        console.log(role)
        const response = await axios.post(url, {
            model: 'gpt-4o-mini',
            messages: [{role: 'system', content: "you are an assistant who focuses on homelessness. Only refer to organisations that i mention. your goal is to assist the end user with finding valid information to the aberdeen area. Your response should prioritise income; then mental health; then family; then jobs/education. DO NOT REFER TO ANY SITES OR SERVICES WHICH ARE NOT SPECIFIED IN THIS PROMPT. if the user mentions financial issues, you should refer to the citizens advice data, and the scottish welfare fund data. if they mention anything mental health related, all information should be derived from the breathing space data or the samh data, if the user mentions employment you must refer to the abzworks data. regardless of the users root issue, you should also make sure their financial and mental wellbeing is ok as well. here is the citizens advice data" + citAdvice + " heres the breathing space data: " + breathingSpace1 + "  " + breathingSpace2 + "here is the samh data:" + samh +  " heres the abzworks data " + abz + " and herre is the scottish welfare fund data: " + swf + " If the user is some with a conflict at home, including domestic abuse and or violence, you should redirect them to scottishconflictresolution, specifically this segment of their site: sk Andy After you submit a question we will get back in touch by email straight away. If you provide permission we may also post the question and answer anonymously in the Community Discussion part of the website to help others who may be in a similar situation. This service is confidential and we will not pass on your email address to anyone."}, 
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

        }else{
            console.log("role " + role)
            console.log(prompt)
            const response = await axios.post(url, {
                model: 'gpt-4o-mini',
                messages: [{role: 'system', content: "you are an assistant who focuses on homelessness. The user is enquiring on behalf on someone they know, your answer should help them redirect the person they know. Only refer to organisations that i mention. your goal is to assist the end user with finding valid information to the aberdeen area. Your response should prioritise income; then mental health; then family; then jobs/education. DO NOT REFER TO ANY SITES OR SERVICES WHICH ARE NOT SPECIFIED IN THIS PROMPT. if the user mentions financial issues, you should refer to the citizens advice data, and the scottish welfare fund data. if they mention anything mental health related, all information should be derived from the breathing space data or the samh data, if the user mentions eployment you must refer to the abzworks data. here is the citizens advice data" + citAdvice + " heres the breathing space data: " + breathingSpace1 + "  " + breathingSpace2 + "here is the samh data:" + samh +  " heres the abzworks data " + abz + " and herre is the scottish welfare fund data: " + swf + " If the user if a young person with a conflict at home, you should redirect them to scottishconflictresolution, specifically this segment of their site: sk Andy After you submit a question we will get back in touch by email straight away. If you provide permission we may also post the question and answer anonymously in the Community Discussion part of the website to help others who may be in a similar situation. This service is confidential and we will not pass on your email address to anyone."}, 
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
            
}

module.exports = callOpenAI;

