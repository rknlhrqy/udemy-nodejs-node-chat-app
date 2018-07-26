/**
 * jQuery.deparam - The opposite of jQuery param.
 * Create an object of query string parameters.
 * 
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
 */
(function($){
  $.deparam = $.deparam || function(uri) {
    if(uri === undefined) {
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp("([^?=&]+)(=([^&#]*))?", "g"),
      ($0, $1, $2, $3) => {
        queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
      }
    );
    return queryString;
  };
})(jQuery);