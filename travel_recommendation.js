const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");

searchButton.addEventListener('click', function() {

    const searchInput = document.getElementById("search-bar").value.trim().toLowerCase();

    fetch('travel_recommendation_api.json')
    .then(response => {
        if(!response.ok) {
            throw new Error("Error");
        }
        return response.json();
    })
    .then(data => {

        let results = [];
            
        if (searchInput.includes('beach')) {
            results = data.beaches;
        } else if (searchInput.includes('temple')) {
            results = data.temples;
        } else if (searchInput.includes('country')) {
            results = data.countries.flatMap(country => country.cities);
        }

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.forEach(place => {
                const placeDiv = document.createElement('div');
                placeDiv.innerHTML = `
                    <h3>${place.name}</h3>
                    <img src="${place.imageUrl}" alt="${place.name}" style="width:200px; height:auto;">
                    <p>${place.description}</p>
                `;
                resultsContainer.appendChild(placeDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }

    })
    .catch(error => console.error("Error:", error));

})

clearButton.addEventListener('click', function() {
    const resultsContainer = document.getElementById('results');
    while(resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
})