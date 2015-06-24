/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sri',
  included: function(app) {
    this._super.included.apply(this,arguments);

    this.options = app.options;
  },
  postprocessTree: function(type, tree) {
    var options = {};
    return require('broccoli-sri-hash')(tree, options);
  }
};
