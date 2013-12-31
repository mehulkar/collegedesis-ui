export default Ember.Object.extend({
  // internal properties
  json: null,
  id: null,
  oEmbed: null,
  widget: null,
  inDom: false,

  // public properties
  title: Em.computed.alias('json.title'),
  url: Em.computed.alias('json.permalink_url'),
  artist: Em.computed.alias('json.user.username'),

  // public computed property
  embedHtml: function() {
    return this.get('oEmbed.html').replace("http%3A%2F%2F", '//');
  }.property('oEmbed'),

  // public method
  load: function() {
    var url,
      _this = this;
    url = this.get('json.permalink_url');
    return SC.oEmbed(url, {
      auto_play: false
    }, function(oEmbed) {
      return _this.set('oEmbed', oEmbed);
    });
  },

  // state
  isLoaded: Em.computed.notEmpty('oEmbed'),
});