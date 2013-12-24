var LoginController = Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      email: "",
      password: "",
      errorMessage: ""
    });
  },

  actions: {

    login: function() {

      var self = this;

      var data = {
        session: this.getProperties('email', 'password')
      };

      Ember.$.post('http://localhost:3000/v1/sessions', data, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
        self.transitionToRoute('index');
      });
    }
  }

});

export default LoginController;