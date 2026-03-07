(function() {

  var SIX_HOURS = 6 * 60 * 60 * 1000;
  var now = Date.now();
  var lastVisit = localStorage.getItem('lastVisit');

  if (lastVisit && (now - parseInt(lastVisit, 10)) < SIX_HOURS) {
    var el = document.getElementById('wall-text');
    if (el) {
      el.innerHTML =
        '<h2>you\'ve been here before.</h2>\n' +
        '<p>you\'ve returned to the weathered concrete wall.</p>\n' +
        '<p>it is smooth and relatively featureless, and extends as far as you can see in either direction.</p>';
    }
  }

  localStorage.setItem('lastVisit', now.toString());

})();
