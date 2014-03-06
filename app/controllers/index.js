export default Ember.Controller.extend({
  needs: ['map', 'application'],

  currentUser: Em.computed.alias('controllers.application.currentUser'),
});