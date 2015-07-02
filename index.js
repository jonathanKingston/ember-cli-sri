/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sri',
  included: function(app) {
    this._super.included.apply(this,arguments);

    this.options = app.options;
    if ('fingerprint' in app.options && 'prepend' in app.options.fingerprint) {
      this.options.prefix = app.options.fingerprint.prepend;
    }
  },
  postprocessTree: function(type, tree) {
    var options = this.options || {};
    return require('broccoli-sri-hash')(tree, options);
  }
};
