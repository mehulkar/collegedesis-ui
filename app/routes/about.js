var AboutRoute = Ember.Route.extend({
  beforeModel: function() {
    var _this = this;
    return this.store.find('organization', {
      slug: 'collegedesis'
    }).then(function(data) {
      var cd;
      cd = data.get('firstObject');
      return _this.transitionTo('d.show', cd);
    });
  }
});

export default AboutRoute;