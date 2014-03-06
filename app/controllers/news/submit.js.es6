export default Ember.ObjectController.extend({
  needs: ['application'],

  currentUser: Em.computed.alias('controllers.application.currentUser'),

  showPreview: false,

  showingPreview: Em.computed.alias('showPreview'),

  actions: {
    submit: function() {

      if (!this.get('formHasErrors')) {
        this._assignAuthor();
        var self = this;
        return this.get('content').save().then(function(story) {
          self.createNewBulletin();
          return self.transitionToRoute('news.story', story);

        });
      }
    }
  },

  createNewBulletin: function() {
    var bulletin = this.store.createRecord('bulletin');
    this.set('content', bulletin);
  },

  /*
    Properties and functions needed to assign
    an author for a polymorphic relationship.
  */

  possibleAuthors: function() {
    var arr, currentUser, orgs, userObject;
    arr = Em.A();
    currentUser = this.get('currentUser');

    if (currentUser) {
      userObject = Ember.Object.create({
        id: currentUser.get('id'),
        name: currentUser.get('fullName'),
        type: 'User'
      });

      arr.pushObject(userObject);

      orgs = currentUser.get('organizations');

      orgs.forEach(function(item) {
        var orgObject;
        if (item) {
          orgObject = Ember.Object.create({
            id: item.get('id'),
            name: item.get('name'),
            type: 'Organization'
          });
          return arr.pushObject(orgObject);
        }
      });
    }

    return arr;
  }.property('currentUser.organizations.@each.name'),

  assignedAuthor: null,

  _assignAuthor: function() {
    var author = this.get('assignedAuthor');

    this.set('content.authorId', author.get('id'));
    this.set('content.authorType', author.get('type'));
  },

  errors: function() {
    return [
      {msg: 'Enter a valid URL',  success: this.get('validUrl')},
      {msg: 'Pick an author',     success: this.get('assignedAuthor')}
    ]
  }.property('assignedAuthor', 'validUrl'),

  formHasErrors: function() {
    var falsies = [null, undefined, false];
    var successes = this.get('errors').map(function(err) {
      if (falsies.contains(err.success)) {
        return false
      } else {
        return true
      }
    });
    return successes.contains(false);
  }.property('errors.@each.success'),

  validUrl: function() {
    return this.get('urlIncludesProtocol') && !this.get('urlIsShortened');
  }.property('url'),

  urlIsShortened: function() { return false; }.property('url'),

  urlIncludesProtocol: function() {
    if (this.get('url') != null) {
      return this.get('url').match(/^https?:\/\/.+\..+/);
    }
  }.property('url'),
});