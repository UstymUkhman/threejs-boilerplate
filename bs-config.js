/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

module.exports = {
  "ui": { "port": 8081 },
  "server": './build',
  "files": ['build'],

  "middleware": false,
  "watchOptions": {},
  "serveStatic": [],
  "proxy": false,
  "port": 8080,

  "ghostMode": {
    "clicks": true,
    "scroll": true,

    "forms": {
      "toggles": true,
      "submit": true,
      "inputs": true
    }
  },

  "scrollRestoreTechnique": "window.name",
  "scrollProportionally": true,
  "scrollElementMapping": [],
  "reloadOnRestart": false,
  "hostnameSuffix": false,
  "logConnections": false,
  "logFileChanges": true,
  "browser": "default",
  "scrollElements": [],
  "scrollThrottle": 0,
  "reloadDebounce": 0,
  "reloadThrottle": 0,
  "rewriteRules": [],
  "logSnippet": true,
  "logLevel": "info",
  "logPrefix": "BS",
  "reloadDelay": 0,
  "open": "local",
  "notify": true,
  "cors": false,
  "plugins": [],
  "xip": false,

  "injectChanges": true,
  "timestamps": true,
  "localOnly": false,
  "startPath": null,
  "codeSync": true,
  "minify": true,
  "host": null,

  "clientEvents": [
    "scroll:element",
    "input:toggles",
    "form:submit",
    "input:text",
    "form:reset",
    "scroll",
    "click"
  ],

  "socket": {
    "path": "/browser-sync/socket.io",
    "clientPath": "/browser-sync",
    "namespace": "/browser-sync",

    "socketIoClientConfig": {
      "reconnectionAttempts": 50
    },

    "clients": {
      "heartbeatTimeout": 5000
    },

    "socketIoOptions": {
      "log": false
    }
  },

  "tagNames": {
    "js": "script",
    "less": "link",
    "scss": "link",
    "css": "link",
    "jpeg": "img",
    "jpg": "img",
    "png": "img",
    "svg": "img",
    "gif": "img"
  }
};
