Ember.Handlebars.helper('markdown', function(value) {
  if (Ember.isEmpty(value)) return "";
  var converter = new Showdown.converter({ extensions: ['youtube'] });
  return new Ember.Handlebars.SafeString(converter.makeHtml(value));
});