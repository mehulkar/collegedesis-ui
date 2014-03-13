export default Ember.ObjectController.extend({
  working: false,
  needs: ['application'],

  actions: {
    submit: function() {
      var self = this;
      if (!self.get('formHasErrors')) {
        this.setProperties({
          authSuccess: null,
          authErrorMsg: null,
          working: true,
        });

        // manually construct a data hash for the POST
        var user = self.get("model");

        var data = {
          email: user.get('email'),
          password: user.get('password'),
          password_confirmation: user.get('passwordConfirmation'),
          full_name: user.get('fullName'),
        };

        // get the API url host
        var host          = self.store.adapterFor('user').get('host');
        var userCreateURL = host + '/users';

        // make the request manually instead of using .save()
        // we need to do this because the API returns an apiKey object
        // and ember-data expects the user object.

        Ember.$.post(userCreateURL, { user: data })
        .done(function(results) {
          var authManager = self.get('controllers.application.authManager');
          authManager.authenticate(results.api_key.access_token, results.api_key.user_id);

          self.set('working', false);
          return self.transitionToRoute('index');
        })
        .error(function(response) {
          self.setProperties({
            authSuccess: false,
            authErrorMsg: response.responseText,
            password: null,
            passwordConfirmation: null,
            working: false
          });

          $('#main-form input[type="password"]')[0].focus();
        });
      }
    },
  },

  authSuccess: null,
  authErrorMsg: null,

  resetAuthSuccess: function() {
    if (this.get('password.length') && this.get('authSuccess') === false) {
      this.setProperties({
        authSuccess: null,
        authErrorMsg: null
      });
    }
  }.observes('password'),

  errors: function() {
    var errs = [
      {msg: 'Enter a valid email address',                success: this.get('validEmail')},
      {msg: 'Enter your name',                            success: this.get('validName')},
      {msg: 'Password should be more than 6 characters',  success: this.get('validPassword')},
      {msg: 'Confirm password',                           success: this.get('passwordMatch')},
    ]
    if (this.get('authSuccess') === false) {
      errs.pushObject({
        msg: this.get('authErrorMsg'),
        success: this.get('authSuccess')}
      )
    }
    return errs;
  }.property('validName', 'validEmail', 'validPassword', 'passwordMatch'),

  formHasErrors: function() {
    var falsies = [null, undefined, false];
    var successes = this.get('errors').map(function(err) {
      if (falsies.contains(err.success)) {
        return false
      } else {
        return true
      }
    });
    return successes.contains(false);
  }.property('errors.@each.success'),

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
