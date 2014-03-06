// uses markdown-js
// https://github.com/evilstreak/markdown-js
// bower install markdown --save

var showdown = require('collegedesis/showdown');
var showdown_youtube = require('collegedesis/showdown-youtube');

export default Ember.Handlebars.makeBoundHelper(function(value) {
  if (Ember.isEmpty(value)) return "";
  var converter = new showdown.default.converter({ extensions: ['youtube'] });
  return new Ember.Handlebars.SafeString(converter.makeHtml(value));
});