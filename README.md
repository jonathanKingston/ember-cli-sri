# Ember-cli-sri

This plugin is used to generate [SRI integrity](http://www.w3.org/TR/SRI/) for ember applications.

This is **BETA**, untested and **MUST NOT** be used for production systems.

## Installation

* `ember install ember-cli-sri`

## Configure

In `Brocfile.js` or `ember-cli-build.js`:
```
var app = new EmberApp({
  SRI: {
    crossorigin: 'anonymous'
  },
  fingerprint: {
    prepend: 'https://subdomain.cloudfront.net/'
  }
});
```

### Options

- **SRI**
  - **crossorigin** - adds a crossorigin attribute to script and link elements
      - This is **required** for CORS resources values are:
          - `use-credentials`
          - `anonymous`
  - **enabled** - by default this is `true` besides in development where it is `false`
- **fingerprint**
  - **prepend** - resources with a full path will only get an applied integrity if the md5 checksum passes


## Running Tests

* `npm test`

