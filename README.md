# Ember-cli-sri
[![npm status](http://img.shields.io/npm/v/ember-cli-sri.svg)](https://www.npmjs.org/package/ember-cli-sri)
[![build status](https://secure.travis-ci.org/jonathanKingston/ember-cli-sri.svg)](http://travis-ci.org/jonathanKingston/ember-cli-sri)
[![dependency status](https://david-dm.org/jonathanKingston/ember-cli-sri.svg)](https://david-dm.org/jonathanKingston/ember-cli-sri)

This plugin is used to generate [SRI integrity](http://www.w3.org/TR/SRI/) for ember applications. The reason to add this to your application is to protect against poisoned CDNs.

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
          - `anonymous` - this will be the default if `origin` and `fingerprint.prepend` match
  - **runsIn** - default: ['production', 'test']
  - **enabled** - default: true
- **fingerprint**
  - **prepend** - resources with a full path will only get an applied integrity if the md5 checksum passes

## Example output

```
<script src="https://example.com/thing-5e1978f9cfa158d9841d7b6d8a4e5c57.js" integrity="sha256-oFeuE/P+XJMjkMS5pAPudQOMGJQ323nQt+DQ+9zbdAg= sha512-+EXjzt0I7g6BjvqqjkkboGyRlFSfIuyzY2SQ43HQKZBrHsjmRzEdjSHhiDzVs30nXL9H0tKw6WbMPc6RfzUumQ==" crossorigin="anonymous" /></script>
<script src="https://example.com/thing-5e1978f9cfa158d9841d7b6d8a4e5c57.js" crossorigin="use-credentials"  integrity="sha256-oFeuE/P+XJMjkMS5pAPudQOMGJQ323nQt+DQ+9zbdAg= sha512-+EXjzt0I7g6BjvqqjkkboGyRlFSfIuyzY2SQ43HQKZBrHsjmRzEdjSHhiDzVs30nXL9H0tKw6WbMPc6RfzUumQ=="/></script>
<script src="unicode-chars.js" integrity="sha256-TH5eRuwfOSKZE0EKVF4WZ6gVQ/zUch4CZE2knqpS4MU= sha512-eANuTl8NOQEa4/zm44zxX6g7ffwf6NXftA2sv4ZiQURnJsfJkUnYP8XpN2XVVZee4SjB32i28WM6trs9HVgQmA=="/></script>
```

## Gotchas

- If your Ember application is **NOT** being loaded on the same origin as in `fingerprint.prefix`:
  - The `fingerprint.prefix` domain will need to be serving [CORS Headers](http://www.w3.org/TR/cors/)

- If your Ember application **is** being loaded on the same origin as in `fingerprint.prefix`:
  - Setting the crossorigin attribute isn't advised unless origin is serving [CORS Headers](http://www.w3.org/TR/cors/)

## Crossorigin attribute

When the request doesn't match Same Origin Policy the [crossorigin attribute](https://html.spec.whatwg.org/multipage/infrastructure.html#cors-settings-attribute) **MUST** be present for the integrity of the file to be checked.
With an integrity set on an external origin and a missing crossorigin then the browser will choose to 'fail-open' which means it will load the resource as if the integrity attribute was not set.

Values:

- **anonymous** - A cross-origin request (i.e., with Origin: HTTP header) is performed. But no credential is sent (i.e., no cookie, no X.509 certificate, and no HTTP Basic authentication is sent). If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the resource will be tainted and its usage restricted.
- **use-credentials** - A cross-origin request (i.e., with Origin: HTTP header) performed with credential is sent (i.e., a cookie, a certificate, and HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the resource will be tainted and its usage restricted.




## Running Tests

* `npm test`

