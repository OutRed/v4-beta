// hello, this is outred. im guessing if youre looking at this file you have programming knowledge, and this file is detailed with comments so you know what everything does. please dont skid this, it took me awhile. this script powers the game page - i.e. the search bar and each individual game tile, + the iframe for each game. please exuse any mistakes, because i am not that good at javascript and i am still learning :)

// fetches all the game tile data from the games.json file
fetch('/assets/json/games.json')
// selects search bar
  .then(response => response.json())
  .then(data => {
    const gamesContainer = document.querySelector('.games');
    const searchInput = document.querySelector('.search-input');

    // Render the initial grid of images
    renderGrid(data);

    // Add an event listener to the search input that filters the grid as the user types
    searchInput.addEventListener('input', event => {
      const searchQuery = event.target.value.toLowerCase();
      const filteredData = data.filter(item => item.title.toLowerCase().includes(searchQuery));
      if (filteredData.length === 0) {
        // Display message when there are no matching search results
        gamesContainer.innerHTML = '<center><p class="no-results-message">No results found. Join the <a class="hyperlink" href="discord.gg/PBmrGy8EPh">Discord server</a> to request a game.</p></center>';
      } else {
        // Render the grid of images for the matching search results
        renderGrid(filteredData);
      }
    });

    function renderGrid(items) {
      // Clear the current contents of the games container
      gamesContainer.innerHTML = '';
      //`<img src="${item.image}" alt="${item.title}" <h2>${item.title}</h2>';

      // Render the grid of images
      items.forEach(item => {
        const game = document.createElement('div');
        game.classList.add('game');
        game.innerHTML = `<div onclick="localStorage.setItem('currentgame', '/g/assets/${item.root}/${item.file}'); localStorage.setItem('currenttitle', '${item.title}'); localStorage.setItem('currentdescription', '${item.description}'); window.location.href = '/g/load.html';"><img src="/${item.root}/${item.img}" loading="lazy"; alt="${item.title}" draggable="false"><h2>${item.title}</h2></div>`;
        gamesContainer.appendChild(game);

         // Add event listener to the game element to show the iframe popup
        game.addEventListener("click", () => {
        });
      });
    }
  });  