export default Ember.ArrayController.extend({
  savedContent: Em.computed.filterBy('content', 'isNew', false),
});