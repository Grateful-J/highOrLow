const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

let gifSearch;
let gifRating = ['g', 'pg', 'pg-13', 'r']
const gifAPI = process.env.YOUR_API_KEY;


let gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPI}&tag=${gifSearch}&rating=${gifRating}`



