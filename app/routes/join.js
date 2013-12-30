export default Ember.Route.extend({
  beforeModel: function(user) {
    user = this.controllerFor('application').get('currentUser');
    if (user) {
      return this.transitionTo('me');
    }
  },
  model: function() {
    return this.store.createRecord('user');
  },

  activate: function(controller) {
    return $(document).attr('title', 'CollegeDesis - Signup');
  },

  setupController: function(controller, model) {
    var email;
    controller.set('content', model);
    email = controller.get('wipEmail');
    return controller.set('content.email', email);
  }
});