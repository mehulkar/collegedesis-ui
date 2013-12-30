export default Ember.Route.extend({

  beforeModel: function(model) {
    var user = this.controllerFor('application').get('currentUser');

    if (user) {
      if (!user.get('approved')) {
        return this.transitionTo('me');
      }
    } else {
      return this.transitionTo('news');
    }
  },
  model: function() {
    return this.store.createRecord('bulletin');
  },
  exit: function() {
    if (this.get('controller.content.isNew')) {
      return this.get('controller.content').deleteRecord();
    }
  }
});