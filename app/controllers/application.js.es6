export default Ember.Controller.extend({

  lastBuild: function() {
    var raw = $("meta[property='last-build']")[0]['content'];
    return moment(raw).fromNow();
  }.property(),

  currentUser: function() {
    return this.get('authManager.apiKey.user');
  }.property('authManager.apiKey.user'),

  isSignedIn: function() {
    return this.get('authManager').isAuthenticated();
  }.property('authManager.apiKey.access_token'),

  routeChanged: function() {
    if (!window._gaq) { return; }

    return Em.run.next(function() {
      var page = window.location.hash.length > 0 ? window.location.hash.substring(1) : window.location.pathname;
      return window._gaq.push(['_trackPageview', page]);
    });
  }.observes('currentPath'),

  numOfOrganizations: null,
  numOfUniversities: null,
  numOfStates: null,

  currentYear: function() {
    return (new Date()).getFullYear();
  }.property(),

  homePage: function() {
    return this.get('currentPath') === "index";
  }.property('currentPath'),

  directoryPage: function() {
    if (this.get('currentPath') && this.get('currentPath').match(/directory\./)) {
      return true;
    } else {
      return false;
    }
  }.property('currentPath'),

  storyPage: function() {
    if (this.get('currentPath') && this.get('currentPath').match(/news\./)) {
      return true;
    } else {
      return false;
    }
  }.property('currentPath'),

  staticPage: function() {
    if (this.get('homePage'))      { return false; }
    if (this.get('newsPage'))      { return false; }
    if (this.get('directoryPage')) { return false; }

    return this.get('currentPath').capitalize();
  }.property('currentPath', 'homePage'),

  collegeDesisOrg: null,
});
