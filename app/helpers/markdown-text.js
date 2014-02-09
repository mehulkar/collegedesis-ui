// uses markdown-js
// https://github.com/evilstreak/markdown-js
// bower install markdown --save

var markdown = require('collegedesis/markdown');

export default Ember.Handlebars.makeBoundHelper(function(value) {
  if (Ember.isEmpty(value)) return "";
  return new Ember.Handlebars.SafeString(window.markdown.toHTML(value));
});