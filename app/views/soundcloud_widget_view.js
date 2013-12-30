export default Ember.View.extend({
  collapsed: true,
  template: null,
  track: null,
  didInsertElement: function() {
    var currentTrackElement, widget,
      _this = this;
    currentTrackElement = this.$().find('iframe')[0];
    widget = SC.Widget(currentTrackElement);
    this.set('track.widget', widget);
    this.get('controller.viewObjects').pushObject(this);
    widget.bind(SC.Widget.Events.READY, function() {
      return _this.get('controller').play();
    });
    return widget.bind(SC.Widget.Events.FINISH, function() {
      return _this._moveToNextTrack();
    });
  },
  _moveToNextTrack: function() {
    return this.get('controller').nextSong();
  },
  prepend: function() {
    return this._insertElementLater(function() {
      return this.$().prependTo(document.getElementById('party'));
    });
  }
});