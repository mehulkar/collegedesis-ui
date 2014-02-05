// uses markdown-js
// https://github.com/evilstreak/markdown-js
// bower install markdown --save

export default Ember.Handlebars.makeBoundHelper(function(value) {
  if (Ember.isEmpty(value)) return "";
  return new Ember.Handlebars.SafeString(markdown.toHTML(value));
});