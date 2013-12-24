var MeRoute = Ember.Route.extend({
  // TODO See MeController for the current observer implementation of how we're setting the model.
  // It's because the session object doesn't resolve in time for page refresh on this route to load currentUser

  model: function() {
    return this.controllerFor('application').get('currentUser');
  },
});

export default MeRoute;