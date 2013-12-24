var SoundCloudTrack = Ember.Object.extend({
  json: null,
  id: null,
  oEmbed: null,
  widget: null,
  inDom: false,
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
  isLoaded: (function() {
    return this.get('oEmbed') != null;
  }).property('oEmbed'),
  embedHtml: (function() {
    return this.get('oEmbed.html').replace("http%3A%2F%2F", '//');
  }).property('oEmbed'),
  title: (function() {
    return this.get('json.title');
  }).property('json.title'),
  url: (function() {
    return this.get('json.permalink_url');
  }).property('json.permalink_url'),
  artist: (function() {
    return this.get('json.user.username');
  }).property('json.user.username')
});

export default SoundCloudTrack;