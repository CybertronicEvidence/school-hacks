const openai = require('../config/config')

const model = async (req, res) => {
    const response = await openai.listEngines()
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
}

module.exports = model