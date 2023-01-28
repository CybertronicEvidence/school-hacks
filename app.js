// const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
// const { Response } = require("./response");
const request = require('./routes/requestRoute')
const auth = require('./routes/userRoute')
dotenv.config()

const mongo = process.env.MONGO_URI


// connect to mongoose
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to database successfully!`))
    .catch(err => console.log(err))

mongoose.set('strictQuery', false)

// const configuration = new Configuration({
//     organization: "org-8VfMLUqp6gtyQa2ESbrmpFZD",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


const app = express()
const port = process.env.PORT || 3080;
app.use(bodyParser.json())
app.use(cors())

app.use('/api/chat', request)
app.use('/api/auth', auth)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
