var giphy = (function() {
  var apiKey = 'dc6zaTOxFJmzC';

  function buildSearchURL(query) {
    var searchTerms = query.split(' ');

    var url = 'https://api.giphy.com/v1/gifs/search?q=';

    searchTerms.forEach((term, i) => {
      url += `${term}`;
      if (i < searchTerms.length - 1) {
        url += '+';
      }
    });

    url += '&limit=12';
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
      url: buildSearchURL(query),
      success: function(response) {
        fn(processData(response), query);
      },
      dataType: 'json'
    });
  }

  function getTrendingGifs(fn) {
    $.get({
      url: `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`,
      success: function(response) {
        fn(processData(response), 'Trending');
      }
    });
  }

  var publicAPI = {
    getThatGif: getThatGif,
    getTrendingGifs: getTrendingGifs
  };
  return publicAPI;
})();
