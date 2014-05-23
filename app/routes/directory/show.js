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
  setupController: function(controller, model) {
    controller.set('content', model);
    return model.reload();
  },
  deactivate: function() {
    return this.controller.set('isEditing', false);
  }
});