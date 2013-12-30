export default Ember.Route.extend({
  setupController: function() {
    return this.controllerFor('newsList').set('content', this.store.find('bulletin'));
  },
  actions: {
    goToBulletin: function(bulletin) {
      return this.transitionTo('news.story', bulletin);
    }
  }
});