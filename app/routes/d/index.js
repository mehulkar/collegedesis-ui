export default Ember.Route.extend({
  beforeModel: function() {
    return this.transitionTo('directory');
  }
});