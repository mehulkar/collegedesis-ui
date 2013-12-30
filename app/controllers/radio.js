import SoundCloudTrack from 'collegedesis/models/soundcloud_track';
import SoundCloudWidgetView from 'collegedesis/views/soundcloud_widget_view';

export default Ember.ArrayController.extend({
  needs: ['application'],
  kClientID: "49620079b9efba53d4ae479266b35ad9",
  kMashupGroupID: "77839",
  kBhangraGroupID: "124626",
  kAcappellaGroupID: "124320",
  kIndependentGroupID: "126422",
  currentGroupId: "77839",
  initialized: false,
  loading: false,
  viewObjects: Em.A(),
  initializeRadioWithChannel: function(groupId) {
    var trackObjects, url, xhr,
      _this = this;
    this.set('loading', true);
    this._clearViews();
    SC.initialize({
      client_id: this.get('kClientID')
    });
    trackObjects = Em.A();
    url = this.get('soundcloudAPIUrl');
    return xhr = $.getJSON(url, function(jsonTracks) {
      _this._shuffleTrackObjects(jsonTracks);
      $(jsonTracks).each(function(index, json) {
        var track;
        track = SoundCloudTrack.create({
          id: index,
          json: json
        });
        return trackObjects.pushObject(track);
      });
      _this.set('content', trackObjects);
      _this.set('currentTrack', _this.get('content').objectAt(0));
      _this.set('nextTrack', _this.get('content').objectAt(1));
      _this.get('currentTrack').load();
      return _this.set('initialized', true);
    });
  },
  currentTrack: null,
  nextTrack: null,
  nextSong: function() {
    this.set('loading', true);
    this.set('currentTrack', this.get('nextTrack'));
    return this.set('nextTrack', null);
  },
  insertCurrentTrack: (function() {
    var view,
      _this = this;
    if (this.get('currentTrack.isLoaded') && !this.get('currentTrack.inDom')) {
      view = SoundCloudWidgetView.create({
        template: Ember.Handlebars.compile(this.get('currentTrack.embedHtml')),
        track: this.get('currentTrack'),
        controller: this
      });
      this.set('currentTrack.inDom', true);
      return Em.run.next(function() {
        return view.prepend();
      });
    }
  }).observes('nextTrack.isLoaded', 'currentTrack.isLoaded'),
  loadAnotherTrack: (function() {
    var id, newTrack;
    if (this.get('nextTrack') === null) {
      id = this.get('currentTrack.id');
      newTrack = this.get('content').objectAt(id + 1);
      this.set('nextTrack', newTrack);
      return this.get('nextTrack').load();
    }
  }).observes('currentTrack.id', 'nextTrack'),
  playing: false,
  play: function() {
    this._animiteTitle();
    if (this.get('initialized')) {
      this.get('currentTrack.widget').play();
      this.set('playing', true);
      return this.set('loading', false);
    } else {
      return this.initializeRadioWithChannel(this.get('currentGroupId'));
    }
  },
  pause: function() {
    this.get('currentTrack.widget').pause();
    return this.set('playing', false);
  },
  _clearViews: function() {
    return this.get('viewObjects').forEach(function(view) {
      return view.remove();
    });
  },
  _animiteTitle: function() {
    $('.now-playing').removeClass('fadeInUp');
    return Em.run.next(function() {
      return $('.now-playing').addClass('fadeInUp');
    });
  },
  soundcloudAPIUrl: (function() {
    var clientID, groupID;
    groupID = this.get('currentGroupId');
    clientID = this.get('kClientID');
    return "https://api.soundcloud.com/groups/" + groupID + "/tracks.json?client_id=" + clientID + "&limit=50";
  }).property('currentGroupId', 'kClientID'),
  _shuffleTrackObjects: function(tracks) {
    var i, j, tempi, tempj, _results;
    i = tracks.length;
    if (i === 0) {
      return false;
    }
    _results = [];
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      tempi = tracks[i];
      tempj = tracks[j];
      tracks[i] = tempj;
      _results.push(tracks[j] = tempi);
    }
    return _results;
  }
});