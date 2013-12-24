var NewsListController = Ember.ArrayController.extend({
  savedContent: Em.computed.filterBy('content', 'isNew', false),
});

export default NewsListController;