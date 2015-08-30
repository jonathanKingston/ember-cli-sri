import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';

var application;

module('Acceptance | main', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /main', function(assert) {
  visit('/main');

  andThen(function() {
    var scripts = document.querySelectorAll('script,link');
    [].forEach.call(scripts, function (script) {
      var integrity = script.getAttribute('integrity');
      assert.ok(/sha256[-]/.test(integrity), 'must have sha256');
      assert.ok(/sha512[-]/.test(integrity), 'must have sha512');
    });
    
  });
});
