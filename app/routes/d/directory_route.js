var DirectoryRoute = Ember.Route.extend({
  activate: function() {
    return $(document).attr('title', 'Directory - CollegeDesis');
  }
});

export default DirectoryRoute;