export default Ember.ObjectController.extend({
  working: false,
  needs: ['application'],

  actions: {
    submit: function() {
      var self = this;
      if (!this.get('errors')) {
        this.set('working', true);

        // manually construct a data hash for the POST
        var user = this.get("model");
        var data = {
          email: user.get('email'),
          password: user.get('password'),
          passwordConfirmation: user.get('passwordConfirmation'),
          fullName: user.get('fullName'),
        }

        // get the API url host
        var host          = this.store.adapterFor('user').get('host');
        var userCreateURL = host + '/users';

        // make the request manually instead of using .save()
        // we need to do this because the API returns an apiKey object
        // and ember-data expects the user object.
        $.post(userCreateURL, { user: data }, function(results) {
          var authManager = self.get('controllers.application.authManager');
          authManager.authenticate(results.api_key.access_token, results.api_key.user_id);

          self.set('working', false);
          return self.transitionToRoute('index');
        });
      }
    },
  },

  errors: function() {
    return !(this.get("validName") && this.get('validEmail') && this.get('validPassword') && this.get('passwordMatch'));
  }.property('validName', 'validEmail', 'passwordMatch'),

  validName: function() {
    return this.get('fullName.length');
  }.property('fullName'),

  validEmail: function() {
    var email = this.get('email');

    if (!Ember.isEmpty(email) && email.match(/^\S+@\S+$/)) {
      return true;
    } else {
      return false;
    }
  }.property('email'),

  validPassword: function() {
    return this.get('password.length') >= 6;
  }.property('password'),

  passwordMatch: function() {
    return this.get('password') === this.get("passwordConfirmation");
  }.property('password', 'passwordConfirmation')
});