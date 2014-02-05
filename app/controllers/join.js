export default Ember.ObjectController.extend({
  working: false,
  needs: ['application'],

  actions: {
    submit: function() {
      var self = this;
      if (!self.get('errors.length')) {
        self.set('working', true);
        self.set("badPassword", true);

        // manually construct a data hash for the POST
        var user = self.get("model");
        var data = {
          email: user.get('email'),
          password: user.get('password'),
          passwordConfirmation: user.get('passwordConfirmation'),
          fullName: user.get('fullName'),
        };

        // get the API url host
        var host          = self.store.adapterFor('user').get('host');
        var userCreateURL = host + '/users';

        // make the request manually instead of using .save()
        // we need to do this because the API returns an apiKey object
        // and ember-data expects the user object.
        $.post(userCreateURL, { user: data }, function(results) {
          var authManager = self.get('controllers.application.authManager');
          authManager.authenticate(results.api_key.access_token, results.api_key.user_id);

          self.set('working', false);
          return self.transitionToRoute('index');
        }).fail(function(error) {
          self.set('badPassword', true);
          self.set('password', null);
          self.set('passwordConfirmation', null);
          $('#main-form input[type="password"]')[0].focus();
          self.set("working", false);
        });
      }
    },
  },

  errors: function() {
    var errs = []
    // badPassword gets set on an error response from server
    if (this.get('badPassword'))    { errs.push('An account with this email exists and you entered a bad password'); }

    // these are client side computed properties
    if (!this.get('validEmail'))    { errs.push('Not a valid email address'); }
    if (!this.get('validName'))     { errs.push('Enter a name'); }
    if (!this.get('validPassword')) { errs.push('Password should be more than 6 characters'); }
    if (!this.get('passwordMatch')) { errs.push('Password confiramtion doesn\'t match'); }


    return errs;
  }.property('validName', 'validEmail', 'passwordMatch', 'badPassword'),

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