export default Em.View.extend({
  tagName: "div",

  attributeBindings: ['contenteditable'],

  plaintext: false,

  isUserTyping: false,

  editable: false,

  contenteditable: (function() {
    if (this.get('editable')) {
      return "true";
    } else {
      return "false";
    }
  }).property('editable'),

  valueObserver: (function() {
    if (!this.get("isUserTyping") && this.get("value")) {
      return this.setContent();
    }
  }).observes("value"),

  didInsertElement: function() {
    return this.setContent();
  },

  focusOut: function() {
    return this.set("isUserTyping", false);
  },

  keyDown: function(event) {
    if (!event.metaKey) {
      return this.set("isUserTyping", true);
    }
  },

  keyUp: function(event) {
    if (this.get("plaintext")) {
      return this.set("value", this.$().text());
    } else {
      return this.set("value", this.$().html());
    }
  },

  setContent: function() {
    if ( this.get('value') ) {
      this.$().html(this.get("value"));
    } else {
      if ( this.get('default') ) {
        this.$().html(this.get('default'));
      }
    }

    if (!this.get('value')) {
      this.$().css('min-width', '100px');
    }
    return undefined;
  }
});