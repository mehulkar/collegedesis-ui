var DIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    return this.transitionTo('directory');
  }
});

export default DIndexRoute;