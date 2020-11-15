require('dotenv').config();


const twilio = require("twilio");

const twilioAPI = process.env.twilioAPI
const twilioAUTH = process.env.twilioAUTH


const twilioClient = new twilio(twilioAPI, twilioAUTH)

twilioClient.messages
    .list()
    .then(messages => console.log(`The most recent message is ${messages[0].body}`)
    ).catch(err => console.log(err));

console.log('Gathering your message')

