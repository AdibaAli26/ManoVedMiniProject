// backend/app.js

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// AI Question Generation Route
app.post('/generate-questions', async (req, res) => {
    const { ageGroup } = req.body;

    const prompt = `Generate 5 mental health questions suitable for children in the age group of ${ageGroup}.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const questions = response.data.choices[0].text.split("\n").filter(q => q);
        res.json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
