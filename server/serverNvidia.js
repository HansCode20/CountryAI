import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const baseURL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const API_KEY = process.env.NVIDIA_API_KEY;

app.post('/chat', async (req, res) => {
    console.log('📥 Received request:', req.body); // Debugging log

    if (!req.body.prompt) {
        return res.status(400).json({ error: "Missing 'prompt' in request body" });
    }

    try {
        const requestData = {
            model: "meta/llama-3.1-405b-instruct",
            messages: [{ role: "user", content: req.body.prompt }],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
        };

        console.log("📤 Sending request to NVIDIA API:", JSON.stringify(requestData, null, 2));

        const response = await axios.post(baseURL, requestData, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        console.log("📥 Received response from NVIDIA API:", JSON.stringify(response.data, null, 2));

        // Log the full response to see its structure
        if (response.data.choices && response.data.choices[0]) {
            console.log("AI response:", response.data.choices[0].message?.content);
            res.json({ response: response.data.choices[0].message?.content || "No response content" });
        } else {
            res.status(500).json({ error: "Empty response or invalid structure from NVIDIA API" });
        }

    } catch (error) {
        console.error("❌ Error from NVIDIA API:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong!", detail: error.response?.data });
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
