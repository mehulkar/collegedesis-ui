var Router = Ember.Router.extend({
  location: 'history',
});

Router.map(function() {
  this.route('story', {path: ':slug'});

  this.resource('directory', function() {
    this.route('index', {path: '/'});
    this.route('show', {path: ':slug'});
  });

  this.route('join');
  this.route('me');
  this.route('about');
  this.route('guidelines');
  this.route('faq');

  this.resource('users', function() {
    this.route('new', {path: 'join'});
    this.route('me');
  });

  this.route('applicationresponse', {path: 'application-response/:id'});
});

export default Router;