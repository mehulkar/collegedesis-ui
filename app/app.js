import Resolver from 'resolver';

export default Ember.Application.extend({
  LOG_ACTIVE_GENERATION: false,
  LOG_MODULE_RESOLVER: false,
  LOG_TRANSITIONS: false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS: false,
  modulePrefix: 'collegedesis', // TODO: loaded via config
  Resolver: Resolver.default,

  ready: function() {
    if (location.hash) {
      window.location = location.origin + location.hash.slice(1);
    }
  }
});

// register helper
import markdown from 'collegedesis/helpers/markdown-text';
Ember.Handlebars.registerHelper('markdown', markdown);

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});