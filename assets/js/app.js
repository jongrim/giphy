$(document).ready(function() {
  // DOM cache
  const searchText = $('#searchText');
  const searchBtn = $('#searchBtn');
  const giphyRow = $('#giphyRow');

  // Bind listeners
  searchBtn.click(addGifs);

  function addGifs() {
    let searchTerms = searchText.val();
    giphy.getThatGif(searchTerms, displayGifs);
  }

  function displayGifs(giphyArray) {
    giphyRow.prepend(
      giphyArray
        .map(gif => {
          return gifHtml(gif);
        })
        .join('')
    );
  }

  function gifHtml(gif) {
    return `<img src='${gif}' class='thumbnail'/>`;
  }
});
