import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | main', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /main', function(assert) {
  visit('/main');

  andThen(function() {
    var singleCheck = false;
    var scripts = document.querySelectorAll('script,link');

    [].forEach.call(scripts, function (script) {
      var integrity = script.getAttribute('integrity');

      if (integrity !== null) {
        singleCheck = true;
        assert.ok(/sha256[-]/.test(integrity), 'must have sha256');
        assert.ok(/sha512[-]/.test(integrity), 'must have sha512');
      }
    });

    assert.ok(singleCheck, 'has at least one integrity check');

    assert.equal(currentURL(), '/main');
  });
});
