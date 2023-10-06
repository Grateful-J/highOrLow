document.getElementById('gifImage').onerror = handleImageError;

let computerCard;
let secondCard;
let cardsRemaining;

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
        const gifImage = document.getElementById('gifImage');   
        gifImage.src = data.url;
    })

    .catch(error => {
        console.log(`Error fetching Gif`, error)
    })
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
