var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var CODE = __dirname+'/experiments';
var React = require('react');

makeIndex();

module.exports = {

  devtool: 'eval',

  entry: fs.readdirSync(CODE).reduce(function (entries, dir) {
    if (isDirectory(path.join(CODE, dir)))
      entries[dir] = path.join(CODE, dir, 'app.js');
    return entries;
  }, {}),

  output: {
    path: 'experiments/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};

function makeIndex () {
  var list = fs.readdirSync(CODE).filter(function(dir) {
    return isDirectory(path.join(CODE, dir));
  }).map(function (dir) {
    return React.DOM.li({}, React.DOM.a({href: '/'+dir}, dir.replace(/-/g, ' ')));
  });
  var markup = React.renderToStaticMarkup((
    React.DOM.html({},
      React.DOM.link({rel: 'stylesheet', href: '/shared.css'}),
      React.DOM.body({id: "index"},
        React.DOM.ul({}, list)
      )
    )
  ));
  fs.writeFileSync('./experiments/index.html', markup);
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

