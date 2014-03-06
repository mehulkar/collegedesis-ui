export default Ember.Route.extend({

  setupController: function(controller) {
    this.controllerFor('news.index').set('content', this.store.find('bulletin'));
    controller.set('newBulletin', this.store.createRecord('bulletin'));
  },

  activate: function(controller) {
    return $(document).attr('title', 'CollegeDesis');
  },

  actions: {
    goToBulletin: function(bulletin) {
      return this.transitionTo('news.story', bulletin);
    }
  }
});