var giphy = (function() {
  var apiKey = 'dc6zaTOxFJmzC';

  function buildSearchURL(query, params) {
    var searchTerms = query.split(' ');

    var url = 'https://api.giphy.com/v1/gifs/search?q=';

    searchTerms.forEach((term, i) => {
      url += `${term}`;
      if (i < searchTerms.length - 1) {
        url += '+';
      }
    });

    for (var n in params) {
      if (params.hasOwnProperty(n)) {
        url += `&${n}=${params[n]}`;
      }
    }

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

  function getThatGif(query, fn, params) {
    if (query.length <= 0) {
      return;
    }
    if (!params) {
      params = { limit: 12 };
    }
    $.get({
      url: buildSearchURL(query, params),
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
