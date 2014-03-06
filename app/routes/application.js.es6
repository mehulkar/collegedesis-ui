import AuthManager from 'app/utils/auth-manager';

export default Ember.Route.extend({

  setupController: function(controller) {
    controller.set('authManager', AuthManager.create());
    console.log('yummy');
    this._loadCollegeDesis();
  },

  actions: {
    goHome: function() {
      return this.transitionTo('index');
    },

    goToHome: function() {
      this.get('controller').showNav();
      return this.transitionTo('index');
    },

    goToNews: function() {
      this.get('controller').showNav();
      return this.transitionTo('news');
    },

    goToAbout: function() {
      this.get('controller').showNav();
      return this.transitionTo('d.show', this.get('controller.collegeDesisOrg'));
    },

    goToDirectory: function() {
      this.get('controller').showNav();
      return this.transitionTo('directory');
    },

    logout: function() {
      this.controller.get('authManager').reset();
      this.transitionTo('index');
    }
  },

  _loadCollegeDesis: function() {
    var _this = this;
    return this.store.find('organization', {
      slug: 'collegedesis'
    }).then(function(data) {
      return _this.controller.set('collegeDesisOrg', data.get('firstObject'));
    });
  },

});