# asset-compiler

This is meant to be a very simple asset compiler that helps speed up development. You add it as middleware in your development environment and it will compile and host all of your assets. This is not recommmended for use during production and it doesn't help you compile your assets for production- not the Rails asset pipeline.

## hosting bootstrap

In this example we have a less file `assets/css/style.less` on disk that uses bootstrap. When the client requests `assets/css/style.css` the asset compiler compiles `assets/css/style.less` and serves the result.

```javascript
var flatiron = require('flatiron'),
    union = require('union'),
    assetCompiler = require('asset-compiler'),
    app = flatiron.app;

app.use(flatiron.plugins.http, {
  before: [
    assetCompiler.middleware(__dirname, {
      css: ['/assets/css', '/vendor/bootstrap/less']
    })
  ]
});
```

## adding a compiler (not complete)

Defining a compiler is fairly straight forward and the complete list is in an object called `compilerMap` because it maps file extensions to compilers. For example, css might map to a less compiler and a stylus compiler.

```javascript
var less = require('less'),
    _ = require('underscore');

var getCompilerMap = function(root, assets) {
  return {
    css: {
      less: function(body, cb) {
        var parser = new less.Parser({
          paths: _.map(assets.css, function(path) { return root + path; })
        });
        return parser.parse(body, function(e, tree) {
          if (e) {
            cb(e);
            return;
          }
          cb(null, tree.toCSS());
        });
      }
    }
  };
};
```

I plan to make it easy to override and add new compilers, but the functionality isn't quite there yet. If you add it feel free to submit a pull request.

