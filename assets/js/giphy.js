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

    url += `&api_key=${apiKey}`;
    return url;
  }

  function getThatGif(query) {
    if (query.length <= 0) {
      return;
    }
    $().get({
      url: buildURL(query),
      success: // TODO
    })
  }
  var publicAPI = {
    getThatGif: getThatGif
  };
  return publicAPI;
})();
