var JoinController = Ember.ObjectController.extend({
  working: false,
  needs: ['application'],

  submit: function() {
    var self = this;
    if (!this.get('errors')) {
      this.set('working', true);

      return this.get('model').save().then(function(results) {
        var authManager = this.get('controllers.application.authManager');
        authManager.authenticate(results.api_key.access_token, results.api_key.user_id);

        self.set('working', false);
        return self.transitionToRoute('index');

      });
    }
  },

  errors: function() {
    return !(this.get("validName") && this.get('validEmail') && this.get('validPassword') && this.get('passwordMatch'));
  }.property('validName', 'validEmail', 'passwordMatch'),

  validName: function() {
    return this.get('fullName.length');
  }.property('fullName'),

  validEmail: function() {
    var email = this.get('email');

    if (!Ember.empty(email) && email.match(/^\S+@\S+$/)) {
      return true;
    } else {
      return false;
    }
  }.property('email'),

  validPassword: function() {
    return this.get('password.length') >= 6;
  }.property('password'),

  passwordMatch: function() {
    return this.get('password') === this.get("password_confirmation");
  }.property('password', 'password_confirmation')
});

export default JoinController;