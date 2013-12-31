var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('news', function() {
    this.route('story', {path: ':slug'});
    this.route('submit');
  });

  this.route('directory');

  this.resource('d', function() {
    this.route('show', {path: ':slug'});
  });

  this.resource('organizations', function() {
    this.route('index');
    this.route('show', {path: ':slug'});
  });

  this.route('join');
  this.route('me');

  this.resource('users', function() {
    this.route('new', {path: 'join'});
    this.route('me');
  });

  this.route('applicationresponse', {path: 'application-response/:id'});
});


Router.reopen({
  location: 'history',
});

export default Router;