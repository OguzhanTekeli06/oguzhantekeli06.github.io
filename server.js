const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Axios'u yükleyeceğiz

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// OpenRouter API key
const API_KEY = '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'; // Buraya OpenRouter API key'inizi yapıştırın

// OpenRouter API URL
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/completions'; // API URL'sini doğru girin

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        // API'ye doğru parametrelerle istek gönderme
        const response = await axios.post(OPENROUTER_API_URL, {
            model: 'gpt-3.5-turbo', // Burada kullanılan model adı doğru olmalı
            prompt: prompt, 
            temperature: 0.8
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,  // API Key doğru olmalı
                'Content-Type': 'application/json'
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
