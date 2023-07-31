const express = require('express');
const axios = require('axios');
const genius = require('genius-lyrics-api'); // Import the genius-lyrics-api library
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'client/dist')));
// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Function to fetch lyrics from the Genius API using the genius-lyrics-api function
async function fetchLyrics(title, artist) {
    const options = {
        apiKey: '_G0u9vWENyzy-YCFpOzm-LjVpwNptccV0wo4jUkya6swiq93lrUuyXSj0-Gk_PSd',
        title,
        artist,
        optimizeQuery: true,
    };

    try {
        const lyrics = await genius.getLyrics(options);
        return lyrics;
    } catch (error) {
        throw new Error('Failed to fetch lyrics from Genius API');
    }
}

// Endpoint to fetch lyrics from Genius API
app.get('/lyrics', async (req, res) => {
    const { title, artist } = req.query;

    try {
        const lyrics = await fetchLyrics(title, artist);
        res.send(lyrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lyrics from Genius API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
