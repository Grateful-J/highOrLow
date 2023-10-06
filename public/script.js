document.getElementById('gifImage').onerror = handleImageError;

let computerCard;
let secondCard;
let cardsRemaining =51;
let deckID;

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

let winnerReacts = [
    "victory dance",
    "champion",
    "first place",
    "winning moment",
    "triumphant",
    "celebration",
    "number one",
    "gold medal",
    "victory lap",
    "winning smile",
    "unexpected win",
    "surprise victory",
    "epic win",
    "crazy celebration",
    "over the top win"
];

let loserReacts = [
    "defeated",
    "sad trombone",
    "better luck next time",
    "consolation",
    "epic fail",
    "facepalm",
    "missed it by that much",
    "so close",
    "try again",
    "losing streak",
    "awkward loss",
    "unlucky",
    "oops",
    "falling short",
    "not even close"
];

//Check if deckID exists before asking for new one
function checkDeck() {
    if (!deckID) {
        getCards();
    } else dealCard();
    console.log(`deck is checked moving on to dealing`)
}

// Fetches from /getDeck
function getCards() {
    fetch('getDeck')
    .then(response => response.json())
    .then (data => {
        deckID = data.deck_id;
        cardsRemaining = data.cardsRemaining;
    })

    .catch(error => {
        console.log(`Error getting cards:`, error)
    })
}

// Fetches from /shuffleDeck
function shuffleDeck() {
    fetch('shuffleDeck')
    .then (response => response.json())
    .then (data => {
        cardsRemaining = data.cardsRemaining;
    })

    .catch(error => {
        console.log(`Error shuffling deck:`, error)
    })

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; // This will hide the overlay
}


//Deal Function
function dealCard() {
    if (cardsRemaining <= 2){
        shuffleDeck();
    }else {
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

     // After the dealer's card is dealt, hide the draw button and show the choices
     document.getElementById('drawButton').style.display = 'none';
     document.querySelector('.choices').style.display = 'block';
}
}

// Choose Lower function
function chooseLower(){
    fetch('/drawCard')
    .then(response => response.json())
    .then(data =>{
        const card2Image = data.img;
        const newCard2 = document.getElementById('second-card')
        newCard2.src = card2Image;

        //Assign 2nd card a value
        secondCard = data.card[0];
    })

    // Calls on valueCheck() and passes reaction array to assignGif()
    const result =valueCheck();
    if(result === 'lower'){
        assignGif(winnerReacts)
    } else assignGif(loserReacts)

    .catch(error => {
        console.log(`Error drawing lower choice`, error)
    })
}

// Choose Higher function
function chooseHigher(){
    fetch('/drawCard')
    .then(response => response.json())
    .then(data =>{
        const card2Image = data.img;
        const newCard2 = document.getElementById('second-card')
        newCard2.src = card2Image;

        //Assign 2nd card a value
        secondCard = data.card[0];

        // Calls on valueCheck() and passes reaction array to assignGif()
        const result =valueCheck();
        if(result === 'higher'){
            assignGif(winnerReacts)
        } else assignGif(loserReacts)
    
    })

    .catch(error => {
        console.log(`Error drawing higher choice`, error)
    })
}

//Assign results GIF from Giphy
function assignGif(result) {
    let i = Math.floor(Math.random() * (result.length));
    const searchTerm = result[i];
    const gifUrl = `/getGif?search=${searchTerm}`;

    //Fetch the GIF
    fetch(gifUrl)
    .then(response => response.json())
    .then(data => {
        //Displays the fetched GIF on front end
        const overlay = document.getElementById('overlay');
        const reactionGif = document.getElementById('reactionGif');
        reactionGif.src = data.url;
        overlay.style.display = 'flex'; // This will show the overlay
    })

    .catch(error => {
        console.log(`Error fetching Gif`, error)
    })

    function displayResult(result) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.textContent = result; // e.g., "You Win!", "You Lose!", "It's a Draw!"
    }

    // At the end of the assignGif function
    setTimeout(resetGame, 3000); // This will reset the game after 5 seconds

    
}



//Search GIF from Giphy
function searchGif() {
    const searchTerm = document.getElementById('searchTerm').value;
    const gifUrl = `/getGif?search=${searchTerm}`

    //Fetch the GIF
    fetch(gifUrl)
    .then(response => response.json())
    .then(data => {
        //Displays the fetched GIF on front end
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

function resetGame() {
    console.log('resetting game..3.2.1.')
    document.getElementById('drawButton').style.display = 'inline-block';
    document.querySelector('.choices').style.display = 'none';
    document.getElementById('gifImage').src = '';
    document.getElementById('second-card').src = '';
    document.getElementById('overlay').style.display = 'none';
}
