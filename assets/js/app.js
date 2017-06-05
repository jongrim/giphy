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
      // create HTML elements
      let $gifCol = $('<div></div>').addClass('col-md-3 col-sm-6 col-xs-12');
      let $gifThumbnailDiv = $('<div></div>').addClass('thumbnail');
      let $gifEl = gifHtml(gif);
      let $gifCaption = $('<div></div>').addClass('caption').append(gifCaption(gif));

      // bind click handler
      $gifEl.click(changeState);

      // hide caption initially
      $gifCaption.hide();

      // append elements
      $gifThumbnailDiv.append($gifEl);
      $gifThumbnailDiv.append($gifCaption);
      $gifCol.append($gifThumbnailDiv);
      return $gifCol;
    });
  }

  function gifHtml(gif) {
    return $('<img>')
      .attr('src', `${gif.animate}`)
      .attr('data-animate', `${gif.animate}`)
      .attr('data-still', `${gif.still}`)
      .attr('state', 'animate')
      .addClass('gif');
    // return `<img src='${gif.animate}' data-animate='${gif.animate}' data-still='${gif.still}' class='gif'/>`;
  }

  function gifCaption(gif) {
    // let captionBits = [];
    let $rating = $('<h5></h5>').text(`Rating: ${gif.rating}`);
    let $url = $('<h5></h5>').text(`URL: ${gif.url}`);
    let $source = $('<h5></h5>').text(`Source: ${gif.source}`);

    let $caption = $('<div></div>').append([$rating, $url, $source]);
    return $caption;
  }

  function changeState(e) {
    let $gif = $(e.target);
    if ($gif.attr('state') === 'animate') {
      $gif.attr('src', $gif.attr('data-still')).attr('state', 'still');
      $gif.next('.caption').slideToggle();
    } else {
      $gif.attr('src', $gif.attr('data-animate')).attr('state', 'animate');
      $gif.next('.caption').slideToggle();
    }
  }
});
