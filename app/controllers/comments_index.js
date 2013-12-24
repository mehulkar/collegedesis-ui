var CommentsIndexController = Ember.ArrayController.extend({
  sortAscending: false,
  sortProperties: ['createdAt']
});

export default CommentsIndexController;