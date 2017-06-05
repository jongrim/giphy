var giphy = (function() {
  var apiKey = 'dc6zaTOxFJmzC';

  function buildURL(query) {
    var searchTerms = query.split(' ');

    var url = 'http://api.giphy.com/v1/gifs/search?';

    searchTerms.forEach((term, i) => {
      url += `q=${term}`;
      if (i < searchTerms.length - 1) {
        url += '&';
      }
    });

    url += '&limit=10';
    url += `&api_key=${apiKey}`;
    return url;
  }

  function processData(response) {
    // verify response status
    if (response.meta.status !== 200) {
      return;
    }
    let gifs = response.data;
    return gifs.map(gif => {
      return {
        animate: gif.images.fixed_width.url,
        still: gif.images.fixed_width_still.url,
        rating: gif.rating,
        url: gif.url,
        source: gif.source
      };
    });
  }

  function getThatGif(query, fn) {
    if (query.length <= 0) {
      return;
    }
    $.get({
      url: buildURL(query),
      success: function(response) {
        fn(processData(response));
      },
      dataType: 'json'
    });
  }
  var publicAPI = {
    getThatGif: getThatGif
  };
  return publicAPI;
})();
