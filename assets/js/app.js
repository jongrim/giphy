$(document).ready(function() {
  // DOM cache
  const $searchText = $('#searchText');
  const $searchBtn = $('#searchBtn');
  const $giphyRow = $('#giphyRow');
  const $play = $('#play');
  const $pause = $('#pause');
  const $trending = $('#trendingSelector');
  const $info = $('#info');

  // state
  let infoVisible = true;

  // Bind listeners
  $searchBtn.click(searchForGifs);
  $('img').click(changeState);
  $trending.click(getTrendingGifs);

  // hide glyphicons to start
  $play.fadeOut(0);
  $pause.fadeOut(0);

  function hideInfo() {
    if (infoVisible) {
      $info.hide();
      $giphyRow.css('text-align', 'left');
      infoVisible = false;
    }
  }

  function searchForGifs(e) {
    e.preventDefault();
    hideInfo();
    let searchTerms = $searchText.val();
    giphy.getThatGif(searchTerms, displayGifs);
  }

  function getTrendingGifs() {
    hideInfo();
    giphy.getTrendingGifs(displayGifs);
  }

  function displayGifs(giphyArray, searchTerms) {
    let giphyChunks = _.chunk(giphyArray, 4);

    $giphyRow.prepend(
      giphyChunks.map(chunk => {
        let $gifRow = $('<div></div>').addClass('row');
        $gifRow.prepend(createGifRow(chunk));
        return $gifRow;
      })
    );

    let $sectionHeader = $('<h2></h2>').text(`${searchTerms.toUpperCase()}`);

    $giphyRow.prepend($sectionHeader);
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
    let $rating = $('<h5></h5>').text(`Rating: ${gif.rating.toUpperCase()}`);
    // let $url = $('<h5></h5>').text(`URL: ${gif.url}`);
    // let $source = $('<h5></h5>').text(`Source: ${gif.source}`);

    let $caption = $('<div></div>').append([$rating]);
    return $caption;
  }

  function changeState(e) {
    let $gif = $(e.target);
    let gifCoords = $gif[0].getBoundingClientRect();
    if ($gif.attr('state') === 'animate') {
      $gif.attr('src', $gif.attr('data-still')).attr('state', 'still');
      $gif.next('.caption').slideToggle();

      $pause.css('height', gifCoords.height);
      $pause.css('transform', `translate(${gifCoords.left + window.scrollX}px, ${gifCoords.top + window.scrollY}px)`);
      $pause.fadeIn(200);
      $pause.fadeOut('slow');
    } else {
      $gif.attr('src', $gif.attr('data-animate')).attr('state', 'animate');
      $gif.next('.caption').slideToggle();

      $play.css('height', gifCoords.height);
      $play.css('transform', `translate(${gifCoords.left + window.scrollX}px, ${gifCoords.top + window.scrollY}px)`);
      $play.fadeIn(200);
      $play.fadeOut('slow');
    }
  }
});
