$(document).ready(function() {
  // DOM cache
  const searchText = $('#searchText');
  const searchBtn = $('#searchBtn');
  const giphyRow = $('#giphyRow');

  // Bind listeners
  searchBtn.on('click', addGifs);

  function addGifs(searchTerms) {
    console.log('Searched for: ', searchTerms);
    let gifs = giphy.getThatGif(searchTerms);
    console.log(gifs);
  }
});
