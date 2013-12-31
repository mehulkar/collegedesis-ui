import AuthManager from 'collegedesis/utils/auth_manager';

export default Ember.Route.extend({

  setupController: function(controller) {
    controller.set('authManager', AuthManager.create());
    this._loadStatData();
    this._loadCollegeDesis();
    controller.set('newBulletin', this.store.createRecord('bulletin'));
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

  _loadStatData: function() {
    var _this = this;
    $.get('api/v1/info', function(data) {
      _this.controller.set('numOfOrganizations', data.orgsCount);
      _this.controller.set('numOfUniversities', data.universityCount);
      _this.controller.set('numOfStates', data.stateCount);
    });
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