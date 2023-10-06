document.getElementById('gifImage').onerror = handleImageError;

let computerCard;
let secondCard;

//determines card ranking
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


//ToDo: fetches from /shuffleCards



//ToDo: Deal Function
function dealCard() {
    //fetches from /drawcard
    //Example return of /drawCard
    //{"card":"8C","img":"https://deckofcardsapi.com/static/img/8C.png"}

    const cardImage = dealCards(response).img

    const newCard = document.getElementById('gifImage');
    newCard.src = cardImage

    //assign computerCard a value
    ComputerCard = response.card.value[0] //ignoring suit

}

//ToDo: Choose Lower Function
function chooseLower() {
    //deal second card
    //check if card is lower 
    chooseHigher(computerCard,secondCard);
    if (chooseHigher === "lower"){
        fetchGif() // ToDo isntead of searching for gif, present an array to pull from of wining gifs
    } // ToDo: else statment with Losing gifs for lose or draw
}

//ToDo Choose Higher Function
function chooseHigher(computerCard, secondCard) {
    //ToDo: rinse and repeast from above function
}







//Fetches GIF from Giphy
function fetchGif() {
    const searchTerm = document.getElementById('searchTerm').value;
    const gifUrl = `/getGif?search=${searchTerm}`

    //Fetch the GIF
    fetch(gifUrl)
    .then(response => response.json())
    .then(data => {
        //displays the fetched GIF on front end
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
