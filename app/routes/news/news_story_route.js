var NewsStoryRoute = Ember.Route.extend({
  serialize: function(model, params) {
    var name, object;
    object = {};
    name = params[0];
    object[name] = model.get('slug');
    return object;
  },
  model: function(params) {
    return this.get('store').findQuery('bulletin', {
      slug: params.slug
    }).then(function(data) {
      return data.get('firstObject');
    });
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('newComment', this.store.createRecord('comment', {
      bulletin: model
    }));
    return controller.set('newVote', this.store.createRecord('vote', {
      bulletin: model
    }));
  },
  afterModel: function(model) {
    var view;
    view = this.store.createRecord('view', {
      viewableId: model.get('id'),
      viewableType: 'Bulletin'
    });
    return view.save();
  }
});

export default NewsStoryRoute;