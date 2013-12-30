var DShowController = Ember.ObjectController.extend({
  needs: ['application'],
  isEditing: false,
  noContactInfo: (function() {
    if (!this.get('website') && !this.get('facebook') && !this.get('instagram') && !this.get('youtube') && !this.get('twitter')) {
      return true;
    } else {
      return false;
    }
  }).property('website', 'facebook', 'instagram', 'youtube', 'twitter'),
  currentUser: (function() {
    return this.get('controllers.application.currentUser');
  }).property('controllers.application.currentUser'),
  currentUserIsAdmin: (function() {
    return this.get('adminMemberships').mapProperty('user').contains(this.get('currentUser'));
  }).property('adminMemberships.@each.user', 'currentUser'),
  currentUserIsMember: (function() {
    return this.get('memberships').mapProperty('user').contains(this.get('currentUser'));
  }).property('memberships.@each.user', 'currentUser'),
  pendingAdminApplication: (function() {
    return this.get('pendingAdminApplications').mapProperty('user').contains(this.get('currentUser'));
  }).property('pendingAdminApplications.@each.user', 'currentUser'),
  currentUserStatus: (function() {
    if (this.get('currentUserIsAdmin')) {
      return "Administrator";
    } else {
      if (this.get('currentUserIsMember')) {
        return "Member";
      } else {
        return "Not a member";
      }
    }
  }).property('currentUserIsAdmin', 'currentUserIsMember'),
  actions: {
    edit: function() {
      return this.set('isEditing', true);
    },
    cancel: function() {
      if (this.get('isDirty')) {
        this.get('content').rollback();
      }
      return this.get('isEditing', false);
    },
    save: function() {
      var _this = this;
      if (!this.get('errors.length')) {
        return this.get('content').save().then(function() {
          return _this.set('isEditing', false);
        });
      }
    },
    applyMembership: function() {
      var mem_type_id;
      mem_type_id = 1;
      return this.createMembershipApplication(mem_type_id);
    },
    applyAdmin: function() {
      var mem_type_id;
      mem_type_id = 2;
      return this.createMembershipApplication(mem_type_id);
    }
  },
  createMembershipApplication: function(mem_type_id) {
    var app, organization, user,
      _this = this;
    user = this.get('currentUser');
    if (!user) {
      return void 0;
    }
    organization = this.get('content');
    app = this.store.createRecord('membershipApplication', {
      user: user,
      organization: organization,
      membershipTypeId: mem_type_id,
      applicationStatusId: 1
    });
    return app.save().then(function(app) {
      app.get('organization').reload();
      return app.get('user').reload();
    });
  },
  errors: (function() {
    var arr;
    arr = Em.A();
    if (!this.get('slugisValid')) {
      arr.push('slug is invalid');
    }
    if (!this.get('twitterIsValid')) {
      arr.push('twitter is invalid');
    }
    if (!this.get('facebookIsValid')) {
      arr.push('facebook is invalid');
    }
    if (!this.get("youTubeIsValid")) {
      arr.push('youtube is invalid');
    }
    return arr;
  }).property('slugisValid', 'twitterIsValid', 'facebookIsValid', 'youTubeIsValid'),
  slugisValid: (function() {
    return this.get('slug') && !this._containsSpaces(this.get('slug'));
  }).property('slug'),
  twitterIsValid: (function() {
    if (this.get('twitter')) {
      return !this._containsSpaces(this.get('twitter'));
    } else {
      return true;
    }
  }).property('twitter'),
  facebookIsValid: (function() {
    if (this.get('twitter')) {
      return !this._containsSpaces(this.get('twitter'));
    } else {
      return true;
    }
  }).property('facebook'),
  youTubeIsValid: (function() {
    if (this.get('youtube')) {
      return !this._containsSpaces(this.get('youtube'));
    } else {
      return true;
    }
  }).property('youtube'),
  _containsSpaces: function(str) {
    if (str) {
      if (str.match(/\s+/)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
});

export default DShowController;