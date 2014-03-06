export default Ember.View.extend({
  classNames: ['bulletin'],

  controllerContentDidChange: function() {
    $('body').scrollTop(0);
  }.observes('controller.content'),

});