require('dotenv').config();
const axios = require('axios');


//Deck of Cards API URL
const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

//Giphy API search string variables
let gifSearch = 'sad-dog';
let gifRating = ['g', 'pg', 'pg-13', 'r'];
const gifAPI = process.env.GIF_API_KEY;

//Allows user to seach terms & "age" rating for returned content
let gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPI}&tag=${gifSearch}&rating=${gifRating[2]}`;  

let gotGifs;

async function fetchGifs() {
    axios.get(gifUrl)
    .then(response => {
        const gotGifs = response.data.data.url;
        newImage.src = gotGifs;
        //console.log( gotGifs);

        //console.log ('response.data dump below: ' , response.data)
    })

    .catch(error => {
        console.log(`Error message: ${error.message}`)
    })
}

fetchGifs()

// Sends requested URL to front end
// function sendGif(gotGifs) {
//     document.getElementById('gifLink').textContent = gotGifs;
//}

