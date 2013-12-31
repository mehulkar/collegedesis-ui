import SoundCloudTrack from 'collegedesis/models/soundcloud_track';
import SoundCloudWidgetView from 'collegedesis/views/soundcloud_widget_view';

export default Ember.ArrayController.extend({
  needs: ['application'],

  // Soundcloud IDs and tokens
  kClientID: "49620079b9efba53d4ae479266b35ad9",
  kMashupGroupID: "77839",
  kBhangraGroupID: "124626",
  kAcappellaGroupID: "124320",
  kIndependentGroupID: "126422",
  currentGroupId: "77839",

  // state properties
  initialized: false,
  loading: false,
  playing: false,

  // accessors for track objects
  // track objects are stored in `content`
  viewObjects: Em.A(),
  currentTrack: null,
  nextTrack: null,

  // computed properties
  currentChannelApiUrl: function() {
    var clientID, groupID;
    groupID = this.get('currentGroupId');
    clientID = this.get('kClientID');
    return "https://api.soundcloud.com/groups/" + groupID + "/tracks.json?client_id=" + clientID + "&limit=50";
  }.property('currentGroupId', 'kClientID'),

  // public actions
  actions: {
    play: function() {
      this._animiteTitle();
      if (this.get('initialized')) {
        this.get('currentTrack.widget').play();
        this.set('playing', true);
        this.set('loading', false);
      } else {
        this.initializeRadioWithChannel();
      }
    },
    pause: function() {
      this.get('currentTrack.widget').pause();
      return this.set('playing', false);
    },

    nextSong: function() {
      this.set('loading', true);
      this.set('currentTrack', this.get('nextTrack'));
      this.set('nextTrack', null);
    },
  },

  // internal actions
  initializeRadioWithChannel: function() {
    var trackObjects = Em.A(),
        url = this.get('currentChannelApiUrl'),
        self = this;

    this.set('loading', true);
    this._clearViews();

    SC.initialize({ client_id: this.get('kClientID') });

    $.getJSON(url, function(jsonTracks) {
      self._shuffleTrackObjects(jsonTracks);
      $(jsonTracks).each(function(index, json) {
        var track = SoundCloudTrack.create({
          id: index,
          json: json
        });
        return trackObjects.pushObject(track);
      });

      self.set('content', trackObjects);
      self.set('currentTrack', self.get('content').objectAt(0));
      self.set('nextTrack', self.get('content').objectAt(1));

      self.get('currentTrack').load();
      self.set('initialized', true);
    });
  },

  _clearViews: function() {
    this.get('viewObjects').forEach(function(view) {
      view.remove();
    });
  },

  _animiteTitle: function() {
    $('.now-playing').removeClass('fadeInUp');
    Em.run.next(function() {
      $('.now-playing').addClass('fadeInUp');
    });
  },

  // observers
  insertCurrentTrack: function() {
    var view,
        self = this;

    if (this.get('currentTrack.isLoaded') && !this.get('currentTrack.inDom')) {
      view = SoundCloudWidgetView.create({
        template: Ember.Handlebars.compile(this.get('currentTrack.embedHtml')),
        track: this.get('currentTrack'),
        controller: this
      });
      this.set('currentTrack.inDom', true);

      Em.run.next(function() { view.prepend(); });
    }
  }.observes('nextTrack.isLoaded', 'currentTrack.isLoaded'),

  loadAnotherTrack: function() {
    var id, newTrack;
    if (this.get('nextTrack') === null) {
      id = this.get('currentTrack.id');
      newTrack = this.get('content').objectAt(id + 1);
      this.set('nextTrack', newTrack);
      return this.get('nextTrack').load();
    }
  }.observes('currentTrack.id', 'nextTrack'),

  // internal functions
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