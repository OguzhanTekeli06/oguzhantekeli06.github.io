const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Axios'u yükleyeceğiz
require('dotenv').config();
const path = require('path'); // Statik dosya sunmak için

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); 
// OpenRouter API key
const API_KEY = process.env.OPENROUTER_API_KEY; // Buraya OpenRouter API key'inizi yapıştırın
console.log("API Key from env:", process.env.OPENROUTER_API_KEY);
console.log("API Key from variable:", API_KEY);
// OpenRouter API URL
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/completions'; // API URL'sini doğru girin

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(OPENROUTER_API_URL, {
            model: 'openai/gpt-3.5-turbo',
            prompt: prompt, 
            temperature: 0.8
        }, {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://oguzhantekeli06.github.io', // Buraya senin frontend adresin
                'X-Title': 'SevgiliyeSozApp'
            }
        });
        // OpenRouter'dan gelen cevap
        const responseMessage = response.data.choices[0].text; // 'message' yerine 'text'
        res.json({ message: responseMessage });
    } catch (error) {
        console.error("API Hatası:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'OpenRouter isteği başarısız' });
    }
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
