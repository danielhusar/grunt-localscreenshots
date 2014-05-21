/*
 * grunt-autoshot
 * https://github.com//grunt-autoshot
 *
 * Copyright (c) 2013 Ferrari Lee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var phantom = require('node-phantom-simple');
  var st = require('st');
  var http = require('http');
  var async = require('async');

  grunt.registerMultiTask('localscreenshots', 'Create a quick screenshot for your site which could help for document or testing.', function() {
    var done = this.async();
    var options = this.options({
      path: __dirname + '/screenshot',
      type: 'jpg',
      name: 'screenshot',
      viewport: ['1920x1080'],
      files: this.filesSrc
    });

    // Core screenshot function using phamtonJS
    var screenshot = function(opts, cb) {
      var viewport = opts.viewport;
      var url = opts.url;
      var filename = opts.filename;
      var type = opts.type;
      var path = opts.path;

      phantom.create(function(err, ph) {
        ph.createPage(function(err, page) {
          if (viewport) {
            var sets = viewport.match(/(\d+)x(\d+)/);
            if (sets[1] && sets[2]) {
              page.set('viewportSize', {
                width: sets[1],
                height: sets[2]
              });
            }
          }
          page.set('zoomFactor', 1);
          page.open(url, function(err, status) {
            var dest = filename + '.' + type;

            // Background problem under self-host server
            page.evaluate(function() {
              var style = document.createElement('style');
              var text = document.createTextNode('body { background: #fff }');
              style.setAttribute('type', 'text/css');
              style.appendChild(text);
              document.head.insertBefore(style, document.head.firstChild);
            });

            page.render(path + '/' + dest, function() {
              grunt.log.writeln('Take a screenshot to ' + dest);
              ph.exit();
              cb();
            });
          });
        });
      });
    };

    // At least local or remote url should be assigned
    if (!options.local) {
      grunt.fail.fatal('Local path to server must be specified');
    }

    http.createServer(
      st({
        path: options.local.path
      })
    ).listen(options.local.port, function() {
      var re = new RegExp('^'+ options.local.path +'\/+')
      async.eachSeries(options.files, function(page, cb) {
        page = page.replace(re, '');
        options.viewport.forEach(function(view, index) {
          screenshot({
            path: options.path,
            filename: page.replace('.html', '') + '-' + view,
            type: options.type,
            url: 'http://localhost:' + options.local.port + '/' + page,
            viewport: view
          }, function() {
            index === (options.viewport.length - 1) ? cb() : false;
          });
        });

      }, function() {
        grunt.event.emit('finish');
      });
    });

    // Listen event to decide when can stop the task
    grunt.event.on('finish', function() {
      done();
    });
  });
};
