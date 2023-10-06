
//Giphy API search string variables
// let gifSearch = 'sad-dog';
// let gifRating = ['g', 'pg', 'pg-13', 'r'];
// const gifAPI = process.env.GIF_API_KEY;

// //Allows user to seach terms & "age" rating for returned content
// let gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPI}&tag=${gifSearch}&rating=${gifRating[2]}`;  

//let gotGifs;


// async function fetchGifs() {
//     axios.get(gifUrl)
//     .then(response => {
//         const newGif = response.data.data.url;
//         gotGifs = newGif;
//         //console.log( gotGifs);
//         //console.log ('response.data dump below: ' , response.data)
//     })

//     .catch(error => {
//         console.log(`Error message: ${error.message}`)
//     })
// }

//Express Demo
// app.get('/', (req, res) =>{
//     console.log('Test')
//     res.send("this is a test")
// })


// fetchGifs()

// Sends requested URL to front end
// function sendGif(gotGifs) {
//     document.getElementById('gifLink').textContent = gotGifs;
//}
