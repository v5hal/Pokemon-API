// Define the initial API endpoint
const initialApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100"; // Adjust the limit as needed

// Function to fetch data for all Pokémon and display it on the webpage
function displayAllPokemonData() {
    fetch(initialApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            // Extract the list of Pokémon from the response
            const pokemonList = data.results;

            // Iterate over each Pokémon in the list
            pokemonList.forEach(pokemon => {
                // Fetch data for the current Pokémon
                fetch(pokemon.url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch Pokémon data');
                        }
                        return response.json();
                    })
                    .then(pokemonData => {
                        // Display the Pokémon data on the webpage
                        displayPokemonCard(pokemonData);
                    })
                    .catch(error => console.error(error));
            });
        })
        .catch(error => console.error(error));
}

// Function to display a Pokémon card on the webpage
function displayPokemonCard(pokemonData) {
    // Create a div element for the Pokémon card
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    // Populate the Pokémon card with data
    pokemonCard.innerHTML = `
        <img class="pokemon-image" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <h3>ID: ${pokemonData.id}</h3>
        <h3>Name: ${pokemonData.name}</h3>
        <h4>Abilities:</h4>
        <ul>
            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <h4>Moves:</h4>
        <ul>
            ${pokemonData.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join('')}
        </ul>
    `;

    // Append the Pokémon card to the container on the webpage
    document.getElementById('pokemon-container').appendChild(pokemonCard);
}

// Call the function to fetch data for all Pokémon and display it on the webpage
displayAllPokemonData();
