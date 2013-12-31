export default Ember.Route.extend({
  serialize: function(model, params) {
    var name, object;
    object = {};
    name = params[0];
    object[name] = model.get('slug');
    return object;
  },
  model: function(params) {
    return this.get('store').findQuery('organization', {
      slug: params.slug
    }).then(function(data) {
      return data.get('firstObject');
    });
  },
  afterModel: function(model) {
    var user;
    user = this.controllerFor('application').get('currentUser');
    if (!user || (user && !user.adminOf(model.get('id')))) {
      return this.transitionTo('d.show', model);
    }
  },
  deactivate: function() {
    var org;
    org = this.get('controller.content');
    if (org.get('isDirty')) {
      return org.rollback();
    }
  }
});