require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'))

//Deck of Cards API URL
const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';



app.get('/getGif', async (req, res) => {
    const gifSearch = req.query.search;
    const gifAPI = process.env.GIF_API_KEY;
    let gifRating = ['g', 'pg', 'pg-13', 'r'];
    let gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPI}&tag=${gifSearch}&rating=${gifRating[3]}`;

    try {
        const response = await axios.get(gifUrl);
        const directGifUrl = response.data.data.bitly_gif_url;
        res.json({url: response.data.data.images.original.url});

    }

    catch(error) {
        res.status(500).json({error: 'Failed to retrieve GIF'})
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


