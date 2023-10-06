document.getElementById('gifImage').onerror = handleImageError;

let computerCard;
let secondCard;

// Determines card ranking
function valueCheck() {
    //Object of card  values
    const cardValues = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '0': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    };

    const computerValue = cardValues[computerCard[0]];
    const secondValue = cardValues[secondCard[0]];

    if (computerValue < secondValue) {
        return 'higher';
    } else if (computerValue > secondValue){
        return 'lower'
    } else {
        return 'draw'
    }
}


// Fetches from /shuffleCards
function shuffleCards() {
    fetch('shuffleDeck')

    .catch(error => {
        console.log(`Error shuffling cards:`, error)
    })
}



//Deal Function
function dealCard() {
    fetch('/drawCard')
    .then(response => response.json())
    .then(data => {
        const cardImage = data.img;
        const newCard = document.getElementById('gifImage');
        newCard.src = cardImage

        // Assign computerCard a Value
        computerCard = data.card[0]; //ignoring suit
    })
  
    .catch(error => {
        console.log('Error dealing cards:', error);
    }) 
}




//Fetches GIF from Giphy
function fetchGif() {
    const searchTerm = document.getElementById('searchTerm').value;
    const gifUrl = `/getGif?search=${searchTerm}`

    //Fetch the GIF
    fetch(gifUrl)
    .then(response => response.json())
    .then(data => {
        //Displays the fetched GIF on front end
        console.log('uploading URL now')
        const gifImage = document.getElementById('gifImage');   
        gifImage.src = data.url;


    })

    .catch(error => {
        console.log(`Error fetching Gif`, error)
    })
}

function handleImageError() {
    const gifImage = document.getElementById('gifImage');
    console.error("Error loading image:", gifImage.src);
}
