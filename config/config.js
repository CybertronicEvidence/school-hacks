const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config()


const configuration = new Configuration({
    organization: "org-8VfMLUqp6gtyQa2ESbrmpFZD",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = openai