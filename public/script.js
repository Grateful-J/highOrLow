document.getElementById('gifImage').onerror = handleImageError;



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
