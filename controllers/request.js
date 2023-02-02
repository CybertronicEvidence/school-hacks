const openai = require('../config/config');
const { ResponseHandler } = require('../utils');

const request = async (req, res) => {
    const { message } = req.body
    console.log(message)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 256,
        temperature: 0.5,
    });
    // res.json({
    //     // data: response.data
    //     message: response.data.choices[0].text
    // })

    ResponseHandler(res, data = response.data.choices[0].text, error = null, status = 200)
}

module.exports = request