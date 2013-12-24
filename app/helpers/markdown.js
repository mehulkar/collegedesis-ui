// need to include showdown.js and the youtube extension for this
// https://github.com/mehulkar/showdown
export default Ember.Handlebars.makeBoundHelper(function(value) {
  if (value !== null) {
    var converter = new Showdown.converter({ extensions: ['video'] });
    return new Ember.Handlebars.SafeString(converter.makeHtml(value));
  } else {
    return "";
  }
});