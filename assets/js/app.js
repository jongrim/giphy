$(document).ready(function() {
  // DOM cache
  const searchText = $('#searchText');
  const searchBtn = $('#searchBtn');
  const giphyRow = $('#giphyRow');

  // Bind listeners
  searchBtn.click(addGifs);
  $('img').click(changeState);

  function addGifs() {
    let searchTerms = searchText.val();
    giphy.getThatGif(searchTerms, displayGifs);
  }

  function displayGifs(giphyArray) {
    let giphyChunks = _.chunk(giphyArray, 4);
    // debugger;
    giphyRow.prepend(
      giphyChunks.map(chunk => {
        let $gifRow = $('<div></div>').addClass('row');
        $gifRow.prepend(createGifRow(chunk));
        return $gifRow;
      })
    );
  }

  function createGifRow(giphyArray) {
    return giphyArray.map(gif => {
      let $gifCol = $('<div></div>').addClass('col-md-3 col-sm-6 col-xs-12');
      let $gifEl = gifHtml(gif);
      $gifEl.click(changeState);
      $gifCol.append($gifEl);
      return $gifCol;
    });
  }

  function gifHtml(gif) {
    return $('<img>')
      .attr('src', `${gif.animate}`)
      .attr('data-animate', `${gif.animate}`)
      .attr('data-still', `${gif.still}`)
      .attr('state', 'animate')
      .addClass('gif')
      .addClass('thumbnail');
    // return `<img src='${gif.animate}' data-animate='${gif.animate}' data-still='${gif.still}' class='gif'/>`;
  }

  function changeState(e) {
    let $gif = $(e.target);
    if ($gif.attr('state') === 'animate') {
      $gif.attr('src', $gif.attr('data-still')).attr('state', 'still');
    } else {
      $gif.attr('src', $gif.attr('data-animate')).attr('state', 'animate');
    }
  }
});
