/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sri',
  included: function(app) {
    this._super.included.apply(this,arguments);

    this.options = app.options.SRI || {};

    // SRI is default on
    if (!('enabled' in this.options)) {
      this.options.enabled = true;
    }
    // Development defaults to be off
    if (app.env === 'development') {
      this.options.enabled = false;
    }

    if ('fingerprint' in app.options && 'prepend' in app.options.fingerprint) {
      this.options.prefix = app.options.fingerprint.prepend;
    }
  },
  postprocessTree: function(type, tree) {
    var options = this.options || {};
    if (options.enabled) {
      return require('broccoli-sri-hash')(tree, options);
    } else {
      return tree;
    }
  }
};
