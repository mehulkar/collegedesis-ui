export default Ember.Route.extend({
  setupController: function() {
    return this.controllerFor('news.index').set('content', this.store.find('bulletin'));
  },
  actions: {
    goToBulletin: function(bulletin) {
      return this.transitionTo('news.story', bulletin);
    }
  }
});