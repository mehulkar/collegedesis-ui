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

  activate: function() {
    return $(document).attr('title', 'CollegeDesis - Signup');
  },
});