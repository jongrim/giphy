$(document).ready(function() {
  // DOM cache
  const searchText = $('#searchText');
  const searchBtn = $('#searchBtn');
  const giphyRow = $('#giphyRow');

  // Bind listeners
  searchBtn.click(addGifs);

  function addGifs() {
    let searchTerms = searchText.val();
    console.log('Searched for:', searchTerms);
    giphy.getThatGif(searchTerms, console.log);
  }
});
