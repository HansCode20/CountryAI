import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Redirect ke GitHub OAuth
app.get("/auth/github", (req, res) => {
    const redirectUrl = "http://localhost:5173/auth/callback"; // Harus cocok dengan yang ada di GitHub App
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUrl}&scope=user`
    );
});

// Tukar code dengan access_token (GUNAKAN POST!)
app.post("/auth/callback", async (req, res) => {
    const { code } = req.body; // Ambil code dari body request

    if (!code) {
        return res.status(400).json({ error: "Authorization code is missing" });
    }

    try {
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            },
            { headers: { Accept: "application/json" } }
        );

        console.log("Token response:", tokenResponse.data);

        if (!tokenResponse.data.access_token) {
            return res.status(400).json({ error: "No access token received" });
        }
        const accessToken = tokenResponse.data.access_token;

        // Request user data dari github
        const userResponse = await axios.get("https://api.github.com/user", {
            headers : { Authorization : `Bearer ${accessToken}`}
        })

        const { login, avatar_url, name } = userResponse.data

        // Kirim ke FE
        res.json({
            token : accessToken,
            username : login,
            avatar : avatar_url,
            name : name
        })

    } catch (error) {
        console.error("Error getting token:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to authenticate" });
    }
});

app.listen(4000, () => console.log(`Server running at port 4000`));
