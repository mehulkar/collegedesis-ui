export default Ember.Controller.extend({

  currentUser: function() {
    return this.get('authManager.apiKey.user');
  }.property('authManager.apiKey.user'),

  isSignedIn: function() {
    return this.get('authManager').isAuthenticated();
  }.property('authManager.apiKey.access_token'),

  routeChanged: function() {
    if (!window._gaq) {
      return;
    }
    return Em.run.next(function() {
      var page;
      page = window.location.hash.length > 0 ? window.location.hash.substring(1) : window.location.pathname;
      return window._gaq.push(['_trackPageview', page]);
    });
  }.observes('currentPath'),

  numOfOrganizations: null,
  numOfUniversities: null,
  numOfStates: null,

  currentYear: function() {
    return (new Date()).getFullYear();
  }.property(),

  firstPage: function() {
    return {
      page: '1'
    };
  }.property(),

  homePage: function() {
    return this.get('currentPath') === "index";
  }.property('currentPath'),

  directoryPage: function() {
    if (this.get('currentPath') && this.get('currentPath').match(/d\./)) {
      return true;
    } else {
      return false;
    }
  }.property('currentPath'),

  collegeDesisOrg: null,

  leftNavVisible: false,

  showNav: function() {
    this.set('leftNavVisible', !this.get('leftNavVisible'));
    return this.pushBody();
  },

  pushBody: function() {
    if (this.get('leftNavVisible')) {
      return $('.page').addClass('push-right');
    } else {
      return $('.page').removeClass('push-right');
    }
  }
});